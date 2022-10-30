import { mapper } from '../../core/src/mapper'
import { mysqlManager } from '../../core/src/database'
import { Logger } from '../../core/src/logger'
import { failed, isPass, passed } from '../../core/src/Try'
import { Shops } from '../../model/src/shops'

class ShopRepository {
  async retrieve(property: keyof Shops, value: any) {
    try {
      const shops = await mysqlManager.execute({
        query: `select * from shops where ${property}= ?`,
        dbParams: [value],
      })

      return passed(mapper(<any[]>shops.result, Shops))
    } catch (e) {
      Logger.error(e)
      return failed(e)
    }
  }

  async insert(shop: Shops) {
    try {
      await mysqlManager.execute({
        query: 'insert into shops (name, address, email,password, created_at, updated_at) values(?,?,?,?,?,?)',
        dbParams: [shop.name, shop.address, shop.email, shop.password, shop.createdAt, shop.updatedAt],
      })
      return passed(true)
    } catch (e) {
      Logger.error(e)
      return failed(e)
    }
  }

  async delete(property: keyof Shops, value: any) {
    try {
      await mysqlManager.execute({
        query: `delete from shops where ${property} = ?`,
        dbParams: [value],
      })
      return passed(true)
    } catch (e) {
      Logger.error(e)
      return failed(e)
    }
  }

  update() {}

  updateProperty() {}
}

export const shopRepository = new ShopRepository()
