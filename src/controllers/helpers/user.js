import { badRequest } from './http.js'
import validator from 'validator'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 charachters',
    })

export const invalidEmailResponse = () =>
    badRequest({
        message: 'Not a valid email. Please provide a valid one',
    })

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided id is not valid',
    })

export const checkIfPasswordIsValid = (password) => password.lenght >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)
