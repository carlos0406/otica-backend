import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export default function Auth (request:Request, response:Response, next:NextFunction) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.status(401).send({ error: 'token não foi enviado' })
  }
  const tokenSplit = authHeader.split(' ')
  if (tokenSplit.length === 2) {
    return response.status(401).send({ error: 'Token Invalido' })
  }

  const [schema, token] = tokenSplit

  if (!/^Bearer$/i.test(schema)) {
    return response.status(401).send({ error: 'Token Invalido' })
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).send({ error: 'Token Invalido' })
    }
    // @ts-ignore
    request.usuarioId = decoded.id
    return next()
  })
}
