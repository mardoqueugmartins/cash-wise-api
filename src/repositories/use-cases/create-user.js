import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../postgres/create-user.js'

export class CreateUserCase {
    async execute(createUserParams) {
        // TO DO - Verificar se o e-mail já está em uso

        // gerar ID do usuário
        const userId = uuidv4()

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        // inserir o usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositório para salvar o usuário no banco de dados
        const postgresCreateUserRepository = new PostgresCreateUserRepository()
        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
