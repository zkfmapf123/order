import { DatabaseManager } from '../src/database'

describe('db connect test', () => {
  it('db : invalid query test', async () => {
    const db = DatabaseManager.setting('mysql')

    const result = await db.execute({
      query: 'select * fromd shops',
    })

    expect(result?._tag).toBe('fail')
  })

  it('db valid query test', async () => {
    const db = DatabaseManager.setting('mysql')

    const result = await db.execute({
      query: 'select * from shops',
    })

    expect(result?._tag).toBe('pass')
  })
})
