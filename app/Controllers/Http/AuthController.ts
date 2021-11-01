import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'


export default class AuthController {
    
    public async store({ auth, request, response }: HttpContextContract) {
        let {email, password} = request.all();

        try {
            const token = await auth.use('api').attempt(email, password);
            return token
        } catch (e){
            return response.badRequest('Invalid credentials');
        }
    }

}
