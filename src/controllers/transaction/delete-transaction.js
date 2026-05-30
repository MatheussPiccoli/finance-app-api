import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    transactionNotFoundResponse,
} from './../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const IdIsValid = checkIfIdIsValid(httpRequest.params.transactionId)

            if (!IdIsValid) {
                return invalidIdResponse()
            }

            const transaction = await this.deleteTransactionUseCase.execute(
                httpRequest.params.transactionId,
            )

            if (!transaction) {
                return transactionNotFoundResponse()
            }
            return ok(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
