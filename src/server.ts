import { SimpleModelController } from '@controllers/SimpleModelController'
import express from 'express'
const app = express()
const controller = new SimpleModelController()

app.get('/', (req, res) => {
  return res.json({ message: controller.teste() })
})

app.listen(3333)
