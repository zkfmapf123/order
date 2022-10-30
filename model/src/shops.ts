import { alias, object, primitive, raw, serializable, serialize } from 'serializr'
import dayjs from 'dayjs'

export class Shops {
  id: number
  @serializable email: string
  @serializable name: string
  @serializable password: string
  @serializable address: string
  @serializable(alias('created_at')) createdAt: number
  @serializable(alias('updated_at')) updatedAt: number

  constructor(data: any) {
    this.email = data?.email ?? null
    this.id = data?.id ?? null
    this.name = data?.name ?? null
    this.password = data?.password ?? null
    this.address = data?.address ?? null
    this.createdAt = data?.created_at ?? dayjs().unix()
    this.updatedAt = data?.updated_at ?? dayjs().unix()
  }

  get serialize() {
    return serialize(this)
  }
}
