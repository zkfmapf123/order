import { configManager } from 'base/core/config'
import { redisManger } from 'base/core/database'
import { errored, FailStatus, successed, SucessStatus } from 'base/core/Return'
import { isFail } from 'base/core/Try'
import { Shops } from 'base/model/shops'
import _ from 'lodash'
import { shopRepository } from 'base/repository/shop.repository'
import { LoginParams } from './schema/login.schema'
import { jwtManager } from './service/jwt.service'

export const handleLogin = async ({ email, password }: LoginParams) => {
  const jwtSecret = <string>configManager.getTokenConfig().jwtSecret
  const shop = await shopRepository.retrieve('email', email)

  // valid shop
  if (isFail(shop)) errored(FailStatus.ERR_INTERNAL, shop.error)
  if (_.isArray(shop) || !shop.result) return errored(FailStatus.ERR_INTERNAL, 'Question Admin')

  const { name, id, password: _password } = shop.result as Shops
  const userTokenKey = `${name}:${id}`

  if (password != _password) return successed(SucessStatus.SUCCESS, 'not invalid password')

  // get token
  const client = await redisManger.getData(userTokenKey)
  if (isFail(client)) errored(FailStatus.ERR_INTERNAL, shop.error)

  const token = client.result ? JSON.parse(client.result) : null

  // not has token
  if (!token) {
    const [accessToken, refreshToken] = [
      jwtManager.getAccessToken({ id, name, jwtSecret }),
      jwtManager.getRefreshToken({ id, name, jwtSecret }),
    ]

    await redisManger.setData(userTokenKey, {
      accessToken,
      refreshToken,
    })

    return successed(SucessStatus.SUCCESS, {
      shopId: id,
      accessToken,
      refreshToken,
    })
  }

  // check expired token -> new issure
  let [isAccessExpired, isRefreshExpire] = [false, false]
  const [accessToken, refreshToken] = Array.from([token.accessToken, token.refreshToken])
    .map((token) => {
      return {
        beforeToken: token,
        decodeToken: jwtManager.decode({ token, jwtSecret }),
      }
    })
    .map(({ beforeToken, decodeToken }, index) => {
      // Expired
      if (isFail(decodeToken)) {
        if (index === 0) {
          isAccessExpired = true
          return jwtManager.getAccessToken({ id, name, jwtSecret })
        }
        isRefreshExpire = true
        return jwtManager.getRefreshToken({ id, name, jwtSecret })
      }

      return beforeToken
    })

  await redisManger.setData(userTokenKey, {
    accessToken,
    refreshToken,
  })

  return successed(SucessStatus.SUCCESS, {
    shopId: id,
    accessToken,
    refreshToken,
    expireToken: {
      accessToken: isAccessExpired ? true : false,
      refreshToken: isRefreshExpire ? true : false,
    },
  })
}

export const handleJoin = async ({ email, password }: LoginParams) => {}
