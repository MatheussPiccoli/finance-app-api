import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/createUser.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        //to do: verificar se o email ja esta em uso
        const userId = randomUUID()

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
