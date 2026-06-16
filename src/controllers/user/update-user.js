import {
    EmailAlreadyInUseError,
    UserNotFoundError,
} from '../../errors/users.js'
import { updateUserSchema } from '../../schemas/user.js'
import {
    serverError,
    ok,
    invalidIdResponse,
    checkIfIdIsValid,
    badRequest,
    NotFound,
} from '../helpers/index.js'
import { ZodError } from 'zod'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            await updateUserSchema.parseAsync(params)

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof ZodError) {
                console.log(error.issues)
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            if (error instanceof UserNotFoundError) {
                return NotFound({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
