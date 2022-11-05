import supertest from 'supertest'
import { shopTestHeler } from './setup/shop.helper'
import { isErrored, isSuccessed } from '../../core/src/Return'
import { oKeys } from '../../core/src/util'

const API_URL = 'http://localhost:3001/auth'

describe('http test', () => {
  const shop = shopTestHeler.getShop()
  beforeAll(async () => {
    await shopTestHeler.start()
  })

  describe('유효성 검사', () => {
    it('올바르지 않은 이메일', async () => {
      supertest(API_URL)
        .post('/login')
        .send({
          data: {
            email: 'not@naver.com',
            password: '123',
          },
        })
        .end((err, res) => {
          const value = res.body
          expect(isErrored(value)).toBe(true)
          expect(value.status).toBe(500)
          expect(value.error).toBe('Question Admin')
        })
    }, 5000)

    it('올바르지 않은 비밀번호', async () => {
      supertest(API_URL)
        .post('/login')
        .send({
          data: {
            email: 'test@naver.com',
            password: 'not',
          },
        })
        .end((err, res) => {
          const value = res.body
          expect(isSuccessed(value)).toBe(true)
          expect(value.status).toBe(200)
          expect(value.result).toBe('not invalid password')
        })
    }, 5000)
  })

  describe('token 검사', () => {
    it('정상적으로 로그인 하는 경우', () => {
      supertest(API_URL)
        .post('/login')
        .send({
          data: {
            email: shop.email,
            password: shop.password,
          },
        })
        .end((err, res) => {
          const value = res.body
          expect(isSuccessed(value)).toBe(true)
          expect(oKeys(value.result)).toContain('shopId')
          expect(oKeys(value.result)).toContain('accessToken')
          expect(oKeys(value.result)).toContain('refreshToken')
        })
    })

    // it('accessTokne이 만료된 경우', (done) => {
    //   done()
    // })

    // it('refreshToken이 만료된 경우', (done) => {
    //   done()
    // })
  })

  afterAll(async () => {
    await Promise.all([
      shopTestHeler.end(shopTestHeler.getShop()),
      shopTestHeler.deleteAccessToken(),
      shopTestHeler.deleteRefreshToken(),
    ])
  })
})
