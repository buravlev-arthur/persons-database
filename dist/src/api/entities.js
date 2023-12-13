export class NoDataError extends Error {
    constructor() {
        super();
        this.status = 404;
        this.message = 'No data found';
    }
}
export class DatabaseError extends Error {
    constructor() {
        super();
        this.status = 500;
        this.message = 'Internal database error';
    }
}
export class MailerError extends Error {
    constructor() {
        super();
        this.status = 500;
        this.message = 'Internal mailer error';
    }
}
export class InvalidParamsError extends Error {
    constructor() {
        super();
        this.status = 400;
        this.message = 'Invalid data';
    }
}
