import { pipe } from '@fxts/core'
import { shopRepository } from '../../../repository/src/shop.repository'
import { Shops } from '../../../model/src/shops'
import { isFail } from '../../../core/src/Try'
import { Logger } from '../../../core/src/logger'
import _ from 'lodash'
import { redisManger } from '../../../core/src/database'

class ShopTestHelper {
  getShop(): Shops {
    const shop = new Shops({
      email: 'test@naver.com',
      name: 'test',
      password: 'test',
      address: '강서구 가양동',
    })

    return shop
  }

  async start(): Promise<void> {
    const result = await pipe(this.getShop(), (shop) => Promise.resolve(shopRepository.insert(shop)))
    if (isFail(result)) throw new Error('insert Error')

    Logger.debug('[TEST] Shop Test Start')
  }

  async end(shop: Shops) {
    await shopRepository.delete('email', shop.email)

    Logger.debug('[TEST] Shop Test End')
  }

  async getId(shop: Shops): Promise<number> {
    const _shop = await pipe(shop, (shop) => Promise.resolve(shopRepository.retrieve('email', shop.email)))
    const _shopResult = _shop.result as Shops
    return _shopResult.id
  }

  async deleteAccessToken() {
    const shop = this.getShop()
    const id = await this.getId(shop)
    await redisManger.delData(`${shop.name}:${id}`)
  }

  async deleteRefreshToken() {}
}

export const shopTestHeler = new ShopTestHelper()
