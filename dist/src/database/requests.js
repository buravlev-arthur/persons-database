import { toConnect, closeConnection } from './connect.js';
export const getPersonByPhone = async (phone) => new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const request = `SELECT * FROM persons WHERE phone='${phone}'`;
    connection.query(request, (error, result) => {
        if (error) {
            reject(error);
        }
        resolve(result);
    });
    closeConnection(connection);
});
export const getPersonByVK = async (vkPagePath) => new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const httpURL = `http://vk.com${decodeURIComponent(vkPagePath)}`;
    const httpsURL = `https://vk.com${decodeURIComponent(vkPagePath)}`;
    const request = `SELECT * FROM persons WHERE vk='${httpURL}' OR vk='${httpsURL}'`;
    connection.query(request, (error, result) => {
        if (error) {
            reject(error);
        }
        resolve(result);
    });
    closeConnection(connection);
});
export const getPersonByName = async (firstname, lastname) => new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const request = `SELECT * FROM persons WHERE firstname='${firstname}' AND lastname='${lastname}'`;
    connection.query(request, (error, result) => {
        if (error) {
            reject(error);
        }
        resolve(result);
    });
    closeConnection(connection);
});
export const getCommentById = async (personId) => new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const request = `SELECT * FROM comments WHERE personId=${personId}`;
    connection.query(request, (error, result) => {
        if (error) {
            reject(error);
        }
        resolve(result);
    });
    closeConnection(connection);
});
export const getCountOfPersons = async () => new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const request = `SELECT COUNT(*) from persons`;
    connection.query(request, (error, result) => {
        if (error || !result) {
            reject(error);
        }
        const count = result[0]['COUNT(*)'];
        resolve(count);
    });
    closeConnection(connection);
});
export const addPerson = async (personData) => new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const values = [
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
    connection.query(request, values, (error, result) => {
        const { insertId: id } = result;
        if (error) {
            reject(error);
        }
        resolve({ id, ...personData });
    });
    closeConnection(connection);
});
export const addComment = async (commentData) => new Promise((resolve, reject) => {
    const connection = toConnect('new');
    const values = [
        commentData.personId,
        commentData.text ?? '',
        String(commentData.createdAt),
    ];
    const request = `INSERT INTO comments \
        (personId, text, createdAt) \
        VALUES(?, ?, ?)`;
    connection.query(request, values, (error, result) => {
        const { insertId: id } = result;
        if (error) {
            reject(error);
        }
        resolve({ id, ...commentData });
    });
    closeConnection(connection);
});
