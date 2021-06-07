import { Router } from 'express'
import { UsuarioController } from '@controllers/UsuarioController'
import { EmpresaController } from '@controllers/EmpresaController'
import { PedidoController } from '@controllers/PedidoController'
import { AutenticacaoController } from '@controllers/AutenticacaoController'
import Auth from './middleware/auth'
const routes = Router()
// Criando os controllers
const usuarioController = new UsuarioController()
const empresaController = new EmpresaController()
const pedidoController = new PedidoController()
const autenticacaoController = new AutenticacaoController()
// rota de teste
routes.get('/', (req, res) => {
  return res.json({ message: 'tá funcionando' })
})
// rotas de um usuario
routes.post('/usuarios', usuarioController.create)
routes.get('/usuarios', Auth, usuarioController.index)
// rotas de uma empresa
routes.post('/empresas', empresaController.create)
routes.get('/empresas', Auth, empresaController.index)
// rotas de um pedido

routes.post('/pedidos', Auth, pedidoController.create)
routes.get('/pedidos', Auth, pedidoController.index)
routes.get('/pedidos/usuarios/:id', Auth, pedidoController.showUsuario)
routes.get('/pedidos/empresas/:id', Auth, pedidoController.showEmpresa)
// Autenticacao
routes.post('/autenticar/usuario', autenticacaoController.autenticarUsuario)
routes.post('/autenticar/empresa', autenticacaoController.autenticarEmpresa)
export default routes
