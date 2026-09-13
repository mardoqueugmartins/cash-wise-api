import { CreateUserCase } from '../repositories/use-cases/create-user.js'

export class CreateUserController {
    async execute(httprequest) {
        try {
            const params = httprequest.body

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim() === '') {
                    return {
                        statusCode: 400,
                        body: {
                            error: `Missing required field: ${field}`,
                        },
                    }
                }
            }

            const createUserUseCase = new CreateUserCase()

            const createdUser = await createUserUseCase.execute(params)

            return {
                statusCode: 201,
                body: createdUser,
            }
        } catch (error) {
            console.log(error)

            return {
                statusCode: 500,
                body: {
                    error: 'Internal server error',
                },
            }
        }
    }
}
