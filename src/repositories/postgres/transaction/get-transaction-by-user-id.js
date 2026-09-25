import { prisma } from '../../../../prisma/prisma.js'

export class PostgresgetTransactionsByUserIdRepository {
    async execute(userId) {
        return await prisma.transaction.findMany({
            where: {
                id: userId,
            },
        })
    }
}
