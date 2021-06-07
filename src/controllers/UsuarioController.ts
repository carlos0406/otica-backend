import { Request, Response } from 'express'
import { prisma } from '../prisma'
import md5 from 'md5'

export class UsuarioController {
  async index (request:Request, response:Response) {
    const usuarios = await prisma.usuario.findMany({
      include: {
        pedidos: true
      }
    })
    return response.json(usuarios)
  }

  async create (request:Request, response:Response) {
    const data = request.body
    const md5password = md5(data.senha)
    data.senha = md5password
    const user = await prisma.usuario.create({
      data

    })
    return response.json(user).status(201)
  }
}
