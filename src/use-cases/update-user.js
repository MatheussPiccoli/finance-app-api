import { EmailAlreadyInUseError, UserDoNotExistError } from '../errors/users.js'
import {
    PostGresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../repositories/postgres/index.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        const postgresGetUserByIdRepository =
            new PostgresGetUserByIdRepository()

        const userWithProvidedId =
            await postgresGetUserByIdRepository.execute(userId)
        console.log(userWithProvidedId)
        if (!userWithProvidedId) {
            throw new UserDoNotExistError()
        }

        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostGresGetUserByEmailRepository()

            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
