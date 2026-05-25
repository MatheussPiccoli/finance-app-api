export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The email ${email} is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserNotFoundError extends Error {
    constructor() {
        super(`User with provided id not found`)
        this.name = 'UserNotFoundError'
    }
}
