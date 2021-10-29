import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async store({ auth, request, response }: HttpContextContract) {
        const {email, password} = request.all();

        console.log(email, password)
        try {
            const token = await auth.use('api').attempt(email, password)
            console.log('aa',token)

            return token
        } catch {
            return response.badRequest('Invalid credentials')
        }
    }

}
