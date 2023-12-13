export class NoDataError extends Error {
  status: number = 404;

  constructor() {
    super();
    this.message = 'No data found';
  }
}

export class DatabaseError extends Error {
  status: number = 500;

  constructor() {
    super();
    this.message = 'Internal database error';
  }
}

export class MailerError extends Error {
  status: number = 500;

  constructor() {
    super();
    this.message = 'Internal mailer error';
  }
}

export class InvalidParamsError extends Error {
  status: number = 400;

  constructor() {
    super();
    this.message = 'Invalid data';
  }
}
