import { Request, Response } from 'express'
import { prisma } from '../prisma'
import md5 from 'md5'

export class EmpresaController {
  async index (request:Request, response:Response) {
    const empresas = await prisma.empresa.findMany()
    return response.json(empresas)
  }

  async create (request:Request, response:Response) {
    const data = request.body
    const md5password = md5(data.senha)
    data.senha = md5password
    const empresa = await prisma.empresa.create({
      data

    })
    return response.json(empresa).status(201)
  }
}
