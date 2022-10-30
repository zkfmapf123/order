import { ClazzOrModelSchema, deserialize } from 'serializr'

export const mapper = <T>(value: any[], schema: ClazzOrModelSchema<T>) => {
  const [_value] = value

  // Not Exists
  if (!_value) {
    return null
  }

  // MapperOne
  if (value.length === 1) {
    return mapperOne(_value, schema)
  }

  // MapMapper
  return mapMapper(value, schema)
}

const mapperOne = <T>(value: any, schema: ClazzOrModelSchema<T>) => {
  return deserialize(schema, value)
}

const mapMapper = <T>(values: any[], schema: ClazzOrModelSchema<T>) => {
  return values
    .map((value) => deserialize(schema, value))
    .reduce((acc, cur) => {
      acc.push(cur)
      return acc
    }, new Array())
}
