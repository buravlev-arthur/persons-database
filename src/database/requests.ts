import { toConnect, closeConnection } from './connect.js';
import type {
  PersonTableRows,
  RequestPersonData,
  RequestCommentData,
  CommentTableRows,
  CommentTableRow,
  PersonTableRow,
} from '../types/structures.js';
import type { QueryError, ResultSetHeader } from 'mysql2';

export const getPersonByPhone = async (phone: string): Promise<PersonTableRows | QueryError> =>
  new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const request = `SELECT * FROM persons WHERE phone='${phone}'`;
    connection.query(request, (error: QueryError | null, result: PersonTableRows) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
    closeConnection(connection);
  });

export const getPersonByVK = async (vkPagePath: string): Promise<PersonTableRows | QueryError> =>
  new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const httpURL = `http://vk.com${decodeURIComponent(vkPagePath)}`;
    const httpsURL = `https://vk.com${decodeURIComponent(vkPagePath)}`;

    const request = `SELECT * FROM persons WHERE vk='${httpURL}' OR vk='${httpsURL}'`;
    connection.query(request, (error: QueryError | null, result: PersonTableRows) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
    closeConnection(connection);
  });

export const getPersonByName = async (firstname: string, lastname: string): Promise<PersonTableRows | QueryError> =>
  new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const request = `SELECT * FROM persons WHERE firstname='${firstname}' AND lastname='${lastname}'`;
    connection.query(request, (error: QueryError | null, result: PersonTableRows) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
    closeConnection(connection);
  });

export const getCommentById = async (personId: number): Promise<CommentTableRows | QueryError> =>
  new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const request = `SELECT * FROM comments WHERE personId=${personId}`;
    connection.query(request, (error: QueryError | null, result: CommentTableRows) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
    closeConnection(connection);
  });

export const getCountOfPersons = async (): Promise<number | QueryError> =>
  new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const request = `SELECT COUNT(*) from persons`;
    connection.query(request, (error: QueryError | null, result: Array<Record<string, number>>) => {
      if (error || !result) {
        reject(error);
      }
      const count = result[0]['COUNT(*)'];
      resolve(count);
    });
    closeConnection(connection);
  });

export const addPerson = async (personData: RequestPersonData): Promise<PersonTableRow | QueryError> =>
  new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const values: string[] = [
      personData.firstname ?? '',
      personData.lastname ?? '',
      personData.surname ?? '',
      personData.phone ?? '',
      personData.address ?? '',
      personData.photo ?? '',
      personData.email ?? '',
      personData.vk ?? '',
      String(personData.createdAt),
    ];
    const request = `INSERT INTO persons \
        (firstname, lastname, surname, phone, address, photo, email, vk, createdAt) \
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(request, values, (error: QueryError | null, result: ResultSetHeader) => {
      const { insertId: id } = result;
      if (error) {
        reject(error);
      }
      resolve({ id, ...personData });
    });
    closeConnection(connection);
  });

export const addComment = async (commentData: RequestCommentData): Promise<CommentTableRow | QueryError> =>
  new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const values: Array<string | number> = [
      commentData.personId,
      commentData.text ?? '',
      String(commentData.createdAt),
    ];
    const request = `INSERT INTO comments \
        (personId, text, createdAt) \
        VALUES(?, ?, ?)`;
    connection.query(request, values, (error: QueryError | null, result: ResultSetHeader) => {
      const { insertId: id } = result;
      if (error) {
        reject(error);
      }
      resolve({ id, ...commentData });
    });
    closeConnection(connection);
  });
