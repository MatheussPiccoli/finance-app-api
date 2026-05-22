import { PostgresHelper } from '../../db/postgres/helper.js'

export class PosgresDeleteUserRepository {
    async execute(userId) {
        const deletedUser = await PostgresHelper.query(
            'DELETE FROM USERS WHERE id = $1 RETURNING *',
            [userId],
        )

        return deletedUser[0]
    }
}
