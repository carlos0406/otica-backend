import { SimpleModel } from '@models/SimpleModel'
test('it shold be ok', () => {
  const user = new SimpleModel()
  user.propiedade = 'propiedade'

  expect(user.propiedade).toEqual('propiedade')
})
