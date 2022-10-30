import { mysqlManager } from '../src/database'

describe('db connect test', () => {
  it('db : invalid query test', async () => {
    const result = await mysqlManager.execute({
      query: 'select * fromd shops',
    })

    expect(result?._tag).toBe('fail')
  })

  it('db valid query test', async () => {
    const result = await mysqlManager.execute({
      query: 'select * from shops',
    })

    expect(result?._tag).toBe('pass')
  })
})
