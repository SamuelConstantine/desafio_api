import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {

    public async create({request}:HttpContextContract) {
        const {email, password} = request.all();


        const user = await User.create({
            email,
            password
        });

        return user;
    }

}
