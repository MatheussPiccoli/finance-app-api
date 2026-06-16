import { badRequest, NotFound } from './http.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 charachters',
    })

export const invalidEmailResponse = () =>
    badRequest({
        message: 'Not a valid email. Please provide a valid one',
    })

export const userNotFoundResponse = () =>
    NotFound({ message: 'User not found' })
