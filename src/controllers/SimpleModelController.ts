import { SimpleModel } from '@models/SimpleModel'

export class SimpleModelController {
  teste ():string {
    const model: SimpleModel = new SimpleModel()
    model.propiedade = 'valor'
    return ('propiedade ' + model.propiedade)
  }
}
