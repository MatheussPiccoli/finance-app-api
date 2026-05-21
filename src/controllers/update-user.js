import { badRequest } from './helpers.js'
import validator from 'validator'
import { EmailAlreadyInUseError } from '../errors/users.js'
import { serverError, ok } from './helpers.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body

            const userId = httpRequest.params.userId

            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return badRequest({ message: 'Provided id is not valid' })
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            if (updateUserParams.password) {
                const passwordIsValid = updateUserParams.password.length >= 6

                if (!passwordIsValid) {
                    return badRequest({
                        message: 'Password must be at least 6 charachters',
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email)

                if (!emailIsValid) {
                    return badRequest({
                        message:
                            'Not a valid email. Please provide a valid one',
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
