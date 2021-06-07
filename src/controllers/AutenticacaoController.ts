import { Request, Response } from 'express'
import { prisma } from '../prisma'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
export class AutenticacaoController {
  async autenticarUsuario (request:Request, response:Response) {
    const { cpf, senha } = request.body
    const senhamd5 = md5(senha)
    const usuario = await prisma.usuario.findUnique({
      where: {
        cpf
      }
    })
    if (!usuario) {
      return response.json({ errorMessage: 'Usuario não encontrado' }).status(400)
    }

    if (usuario.senha !== senhamd5) {
      return response.json({ errorMessage: 'Senha incorreta' }).status(400)
    }
    usuario.senha = undefined
    const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
      expiresIn: 604800
    })
    return response.json({ usuario, token }).status(201)
  }

  async autenticarEmpresa (request:Request, response:Response) {
    const { cnpj, senha } = request.body
    const senhamd5 = md5(senha)
    const empresa = await prisma.empresa.findUnique({
      where: {
        cnpj
      }
    })
    if (!empresa) {
      return response.json({ errorMessage: 'Usuario não encontrado' }).status(400)
    }

    if (empresa.senha !== senhamd5) {
      return response.json({ errorMessage: 'Senha incorreta' }).status(400)
    }
    empresa.senha = undefined
    const token = jwt.sign({ id: empresa.id }, process.env.SECRET, {
      expiresIn: 604800
    })
    return response.json({ empresa, token }).status(200)
  }
}
