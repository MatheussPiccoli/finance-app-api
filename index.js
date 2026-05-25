import 'dotenv/config.js'
import express from 'express'
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'
import { PostgresCreateUserRepository } from './src/repositories/postgres/createUser.js'
import { PostGresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js'
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js'
import { DeleteUserUseCase } from './src/use-cases/delete-user.js'
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js'
import { UpdateUserUseCase } from './src/use-cases/update-user.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const createUserRepository = new PostgresCreateUserRepository()
    const getUserByEmailRepository = new PostGresGetUserByEmailRepository()

    const createUserUseCase = new CreateUserUseCase(
        createUserRepository,
        getUserByEmailRepository,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserRepository = new PostgresUpdateUserRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByEmailRepository = new PostGresGetUserByEmailRepository()

    const updateUserUseCase = new UpdateUserUseCase(
        updateUserRepository,
        getUserByIdRepository,
        getUserByEmailRepository,
    )

    const createUpdateUserController = new UpdateUserController(
        updateUserUseCase,
    )

    const { statusCode, body } =
        await createUpdateUserController.execute(request)

    response.status(statusCode).send(body)
})
app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deleteUserController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
