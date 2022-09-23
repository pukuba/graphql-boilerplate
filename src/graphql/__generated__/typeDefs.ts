const typeDefs = `

type Mutation {
  """강제로 에러를 발생시킵니다"""
  throw: Boolean!
}

type Query {
  """true를 반환합니다."""
  ping: Boolean!
}
`
export default typeDefs
