import type { Connection } from 'mysql2';
import type { ResultSetHeader } from 'mysql2';
import type { Persons } from '../types/structures.js';

export default async (connection: Connection, persons: Persons): Promise<void> =>
  new Promise((resolve) => {
    persons.forEach((person, personIndex) => {
      connection.query(
        `INSERT INTO persons \
            (firstname, lastname, surname, phone, address, photo, email, vk, createdAt) \
            VALUES ('${person.firstname}', '${person.lastname}', '${person.surname}', \
            '${person.phone}', '${person.address}', '${person.photo}', '${person.email}', \
            '${person.vk}', '${person.createdAt}')`,
        (error, result) => {
          if (error) {
            console.error(`💀 Inserting into "persons" is failed. Reason: ${error}`);
          } else {
            const { insertId: id } = result as ResultSetHeader;
            person.comments.forEach(({ message, date }, commentIndex) => {
              connection.query(
                `INSERT INTO comments (personId, text, createdAt) \
                        VALUES (${id}, '${message}', '${date}')`,
                (error) => {
                  if (error) {
                    console.error(`💀 Inserting into "comments" is failed. Reason: ${error}`);
                  } else if (personIndex === persons.length - 1 && commentIndex === person.comments.length - 1) {
                    console.info(`🍻 Parsed data is inserted into tables successfully!`);
                    resolve();
                  }
                },
              );
            });
          }
        },
      );
    });
  });
