import {
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
} from '../helpers'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        const params = httpRequest.body

        const userIdIsValid = checkIfIdIsValid(params.user_id)

        if (!userIdIsValid) {
            return invalidIdResponse()
        }

        const amountIsValid = checkIfAmountIsValid(params.amount)

        if (!amountIsValid) {
            return invalidAmountResponse()
        }

        const type = params.type.trim().toUpperCase()

        const typeIsValid = checkIfTypeIsValid(type)

        if (!typeIsValid) {
            return invalidTypeResponse()
        }
    }
}
