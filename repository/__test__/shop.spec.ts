import { concurrent, map, pipe, toAsync } from '@fxts/core'
import { isPass } from '../../core/src/Try'
import dayjs from 'dayjs'
import { Shops } from '../../model/src/shops'
import { shopRepository } from '../src/shop.repository'

describe('shop Repostiroy ', () => {
  const [shop_1, shop_2, shop_3] = [
    new Shops({
      name: 'leedonggyu',
      email: 'test_1@naver.com',
      password: '123456',
      address: 'korea',
      created_at: dayjs().unix(),
      updated_at: dayjs().unix(),
    }),
    new Shops({
      name: 'leesolbi',
      email: 'test_2@naver.com',
      password: '123456',
      address: 'korea',
      created_at: dayjs().unix(),
      updated_at: dayjs().unix(),
    }),
    new Shops({
      name: 'kaith',
      email: 'test_3@naver.com',
      password: '123456',
      address: 'korea',
      created_at: dayjs().unix(),
      updated_at: dayjs().unix(),
    }),
  ]

  it('[PASS] insert test', async () => {
    const result = pipe(
      [shop_1, shop_2, shop_3],
      toAsync,
      map(shopRepository.insert),
      map((res) => res),
      concurrent(3)
    )

    for await (const r of result) {
      expect(isPass(r)).toBe(true)
    }
  })

  it('[PASS] get user use name', async () => {
    const result = pipe(
      [shop_1.name, shop_2.name, shop_3.name],
      toAsync,
      map((shopName) => shopRepository.retrieve('name', shopName))
    )

    for await (const r of result) {
      expect(isPass(r)).toBe(true)
    }
  })

  it('[PASS] get userAll', async () => {
    const result = await shopRepository.retrieve('password', '123456')
    expect(isPass(result)).toBe(true)
  })

  it('[PASS] exists shop', async () => {
    const result = pipe(
      [shop_1.name, shop_2.name, shop_3.name],
      toAsync,
      map((shopName) => shopRepository.delete('name', shopName)),
      concurrent(3)
    )

    for await (const r of result) {
      expect(isPass(r)).toBe(true)
    }
  })
})
