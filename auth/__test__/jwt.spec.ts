import { jwtManager } from '../src/jwt.service'
import { redisManger } from '../../core/src/database'
import { isPass } from '../../core/src/Try'
import { orderConfig } from '../../core/src/config'
import { pipe, map, each } from '@fxts/core'

describe('jwt test', () => {
  const jwtSecret = orderConfig.getTokenConfig().jwtSecret as string
  const userInfo: [number, string] = [1, 'A']
  const [id, name] = userInfo

  //   beforeAll(async () => {
  //     await redisManger.delData(`${name}:${id}`)
  //   })

  it('현재 토큰이 없는 상태', async () => {
    const tryResult = await redisManger.getData(`${name}:${id}`)

    expect(tryResult).toBe(isPass(tryResult))
  })

  it('토큰 생성 후 -> Redis에 저장', async () => {
    const tryResult = await redisManger.getData(`${name}:${id}`)

    if (!tryResult.result) {
      const [accessToken, refreshToken] = [
        jwtManager.getAccessToken({ id, name, jwtSecret }),
        jwtManager.getRefreshToken({ id, name, jwtSecret }),
      ]

      await redisManger.setData(`${name}:${id}`, {
        accessToken,
        refreshToken,
      })

      const token = await redisManger.getData(`${name}:${id}`)
      console.log(token)
    }
  })

  it('Token 가져오기', async () => {
    const tryResult = await redisManger.getData(`${name}:${id}`)
    const { accessToken, refreshToken } = JSON.parse(tryResult.result)

    const decodeTokenList = pipe(
      Array.from([accessToken, refreshToken]),
      map((token) => jwtManager.decode({ token, jwtSecret }))
    )

    console.log(decodeTokenList.next()) // AccssToken
    console.log(decodeTokenList.next()) // RefreshToken
  })
})
