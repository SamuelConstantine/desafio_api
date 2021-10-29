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
  return { hello: 'world' }
})

Route.post('users', 'UsersController.create')

Route.post('veiculos', 'VeiculosController.create')

Route.post('login', 'AuthController.store');


Route.group(() => {
  Route.post('create', 'VeiculosController.create')
  Route.post('/filtro/:campo', 'VeiculosController.filtrado')
  Route.get('/full', 'VeiculosController.veiculos')
  Route.get('/user/:user', 'VeiculosController.veiculosUser')
  Route.post('/edit', 'VeiculosController.editadoAviso')
}).prefix('/veiculos');