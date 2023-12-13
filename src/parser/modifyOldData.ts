import got from 'got';
import type { Connection, QueryError } from 'mysql2';
import { JSDOM } from 'jsdom';
import type { PersonOldStructure, Comments, Person, Persons } from '../types/structures.js';

const domain = 'http://blacklist-rk.ru';

const getComments = async (path: string): Promise<Comments> => {
  const comments: Comments = [];

  const body = (await got.get(path)).body;
  const document = new JSDOM(body).window.document;
  const commentBlocks = document.querySelectorAll('.comment_block');
  commentBlocks.forEach((commentBlock) => {
    const defaultDate = '01.01.1971';
    const dateContent = commentBlock.querySelector('.comment_date')?.textContent?.slice(20, 30) ?? defaultDate;
    const date = new Date(
      `${dateContent.slice(6, 10)}-${dateContent.slice(3, 5)}-${dateContent.slice(0, 2)}`,
    ).getTime();
    const message = commentBlock.querySelector('.comment_content')?.textContent?.replace('\\"', '') || '';
    comments.push({
      date,
      message,
    });
  });

  return comments;
};

export default async (connection: Connection): Promise<Persons> =>
  new Promise((resolve) => {
    console.info(`🏋 Try to parse table rows...`);

    connection.query('SELECT * from black_phones', async (error: QueryError, rows: PersonOldStructure[]) => {
      if (error) {
        return console.error(`💀 Getting data from table is failed. Reason: ${error}`);
      }

      const modifiedData: Persons = await Promise.all(
        rows.map(async (person: PersonOldStructure): Promise<Person> => {
          const path = `${domain}/${person.order_file}`;
          const comments = await getComments(path);
          return {
            id: person.id,
            phone: person.phone.length ? `+${person.phone}` : '',
            firstname: person.lastname || '',
            lastname: person.name || '',
            surname: person.ltname,
            address: person.adress || '',
            comments,
            photo: person.photo || '',
            email: person.email || '',
            vk: person.vk_link || '',
            createdAt: Number(person.add_date) * 1000 || 0,
          };
        }),
      );

      resolve(modifiedData);
      console.info(`💪 Table rows is processed!`);
    });
  });
