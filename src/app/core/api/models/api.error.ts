export class ApiError {
    constructor(public message?: string, public status?: number) { }
}

export const ErrorStatus = {
    ClientError: 0,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    ServerError: 500
}
