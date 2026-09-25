import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateTransactionsRepository {
    async execute(transactionId, updateTransactionParams) {
        return await prisma.transactions.update({
            where: {
                id: transactionId,
            },
            data: { updateTransactionParams },
        })
    }
}
