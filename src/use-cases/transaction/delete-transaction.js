export class deleteTransactionUseCase {
    constructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository
    }
    async execute(transactionId) {
        const deletedUser =
            await this.deleteTransactionRepository.execute(transactionId)

        return deletedUser
    }
}
