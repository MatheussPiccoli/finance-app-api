import { prisma } from '../../../../prisma/prisma.js'

export class PostGresGetUserByEmailRepository {
    async execute(email) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        })
    }
}
