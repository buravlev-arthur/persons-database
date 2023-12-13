import type { Connection, QueryError } from 'mysql2';
import type { Tables } from '../types/tables.js';

const createPersonsTableQuery = `CREATE TABLE persons (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    firstname VARCHAR(255),\
    lastname VARCHAR(255),\
    surname VARCHAR(255),\
    phone VARCHAR(255),\
    address VARCHAR(255),\
    photo VARCHAR(255),\
    email VARCHAR(255),\
    vk VARCHAR(255),\
    createdAt VARCHAR(255)\
)`;

const createCommentsTableQuery = `CREATE TABLE comments (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    personId INT,\
    text TEXT,\
    createdAt VARCHAR(255)\
)`;

const tables: Tables = [
  {
    name: 'persons',
    createQuery: createPersonsTableQuery,
  },
  {
    name: 'comments',
    createQuery: createCommentsTableQuery,
  },
];

export default async (connection: Connection): Promise<void> =>
  new Promise((resolve) => {
    tables.forEach(({ name, createQuery }, index) => {
      connection.query(`SHOW TABLES LIKE "${name}"`, (error: QueryError, result: []) => {
        if (error) {
          console.error(`💀 Check of "${name}" table is failed. Reason: ${error}`);
        } else if (result.length) {
          console.warn(`🗸 Table "${name}" already exists`);
          if (index === tables.length - 1) {
            resolve();
          }
        } else {
          connection.query(createQuery, (error) => {
            if (error) {
              return console.error(`💀 Creating "${name}" table is failed. Reason: ${error}`);
            }
            console.info(`🗸 Table "${name}" is successfully created`);
            if (index === tables.length - 1) {
              resolve();
            }
          });
        }
      });
    });
  });
