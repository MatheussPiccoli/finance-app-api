import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/createUser.js'
import { PostGresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        //to do: verificar se o email ja esta em uso
        const postgresGetUserByEmailRepository =
            new PostGresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProvidedEmail) {
            throw new Error('The provided email is already in use.')
        }

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
