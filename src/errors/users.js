export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The email ${email} is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserDoNotExistError extends Error {
    constructor() {
        super(`The id provided do not exists`)
        this.name = 'UserDoNotExistError'
    }
}
