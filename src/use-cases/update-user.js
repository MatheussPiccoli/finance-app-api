import { EmailAlreadyInUseError, UserDoNotExistError } from '../errors/users.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    constructor(
        updateUserRepository,
        getUserByIdRepository,
        getUserByEmailRepository,
    ) {
        this.updateUserRepository = updateUserRepository
        this.getUserByIdRepository = getUserByIdRepository
        this.getUserByEmailRepository = getUserByEmailRepository
    }

    async execute(userId, updateUserParams) {
        const userWithProvidedId =
            await this.getUserByIdRepository.execute(userId)
        if (!userWithProvidedId) {
            throw new UserDoNotExistError()
        }

        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(
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

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
