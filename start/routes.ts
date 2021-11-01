/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { Hash } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import UsersController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'saasworld' }
})

Route.group(() => {
  // Cadastrar usuário
  Route.post('create', 'UsersController.create')

  // Verificar usuário
  Route.post('login', 'AuthController.store');

  // Listar todos os usuários
  Route.get('all','UsersController.full')
}).prefix('/user');

Route.group(() => {

  // Cadastrar veículos
  Route.post('create', 'VeiculosController.create')

  // Filtrar por lon e lat
  Route.post('coordenada/:lat/:lon', 'VeiculosController.coordenada')

  // Filtrar veículos
  Route.post('filtro/:campo', 'VeiculosController.filtrado')

  // Listar todo os veículos
  Route.get('full', 'VeiculosController.veiculos')

  // Listar Carros relacionados ao usuário
  Route.post('user/:user', 'VeiculosController.veiculosUser')

  // Editar campos do veículo selecionado
  Route.post('edit/:id', 'VeiculosController.editadarVeiculos')

  // Editar a relação do veículo ao usuário
  Route.post('quantidade/:user/:id', 'VeiculosController.editQuantidade')
  
}).prefix('/veiculos');