import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {

    //Criar user
    public async create({request}:HttpContextContract) {
        const {email, password} = request.all();

        const user = await User.create({
            email,
            password
        });

        return user;
    };

    //Listar todos users
    public async full() {
        const all = await User.all();
        return all;
    };


}
