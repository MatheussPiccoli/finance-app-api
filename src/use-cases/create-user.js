import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/createUser.js'
import { PostGresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'

import { EmailAlreadyInUseError } from '../errors/users.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postgresGetUserByEmailRepository =
            new PostGresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
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
