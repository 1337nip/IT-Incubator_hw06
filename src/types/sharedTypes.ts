
export type ErrorResponse = {
    error: string;
};

export class Error404 extends Error {
    constructor(message:string) {
        super (message);
        this.name = 'Error404'
    }
}

export type ErrorsMessages =  {
    errorsMessages: {field: string, message:string}[]
}

export enum StatusCode {
    NotFound = 4,
    Forbidden = 3,
    Success = 0

}
export type Result<T> = {
    statusCode: StatusCode
    errorMessage?: string
    data?: T
}