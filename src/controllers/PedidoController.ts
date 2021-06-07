import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class PedidoController {
  async index (request:Request, response:Response) {
    const pedidos = await prisma.pedido.findMany()
    return response.json(pedidos)
  }

  async create (request:Request, response:Response) {
    const data = request.body
    const pedido = await prisma.pedido.create({
      data
    })
    return response.json(pedido).status(201)
  }

  async showEmpresa (request:Request, response:Response) {
    const { id } = request.params
    const pedidos = await prisma.pedido.findMany({
      where: {
        empresaId: id
      }
    })
    response.json(pedidos).status(200)
  }

  async showUsuario (request:Request, response:Response) {
    const { id } = request.params
    const pedidos = await prisma.pedido.findMany({
      where: {
        clienteId: id
      }

    })
    return response.json(pedidos).status(200)
  }
}
