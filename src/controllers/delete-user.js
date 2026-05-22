import { serverError } from './helpers/.index.js'
import { checkIfIdIsValid, invalidIdResponse } from './helpers/user.js'
import { DeletedUserUseCase } from './../use-cases/index.js'
import { ok } from './helpers/http.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.body.userId

            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deletedUserUseCase = new DeletedUserUseCase()

            const deletedUser = deletedUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
