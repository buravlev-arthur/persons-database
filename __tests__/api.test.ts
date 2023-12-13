import request from 'supertest';
import startServer from '../src/api/index.js';

describe('SearchPersonByPhone', () => {
  test('200 [OK]', async () => {
    const app = startServer();
    const correctPhone = '+7 (960) 217-73-57';
    const responseOk = await request(app).get(`/persons/phone/${correctPhone}`);
    expect(responseOk.status).toBe(200);
  });

  test('404 [Data not found]', async () => {
    const app = startServer();
    const incorrectPhone = '+7 (000) 210-00-00';
    const responseNoData = await request(app).get(`/persons/phone/${incorrectPhone}`);
    expect(responseNoData.status).toBe(404);
  });

  test('400 [Bad Request]', async () => {
    const app = startServer();
    const invalidData = 'invalid-data';
    const responseInvalidData = await request(app).get(`/persons/phone/${invalidData}`);
    expect(responseInvalidData.status).toBe(400);
  });
});

describe('SearchPersonByVK', () => {
  test('200 [OK]', async () => {
    const app = startServer();
    const existLink = encodeURIComponent('https://vk.com/id261058720');
    const responseOk = await request(app).get(`/persons/vk/${existLink}`);
    expect(responseOk.status).toBe(200);
  });

  test('404 [Data not found]', async () => {
    const app = startServer();
    const notExistLink = encodeURIComponent('https://vk.com/id000000000');
    const responseNoData = await request(app).get(`/persons/vk/${notExistLink}`);
    expect(responseNoData.status).toBe(404);
  });

  test('400 [Bad Request]', async () => {
    const app = startServer();
    const invalidData = encodeURIComponent('invalid-data');
    const responseInvalidData = await request(app).get(`/persons/vk/${invalidData}`);
    expect(responseInvalidData.status).toBe(400);
  });
});

describe('SearchPersonByName', () => {
  test('200 [OK]', async () => {
    const app = startServer();
    const firstname = encodeURIComponent('Валерий');
    const lastname = encodeURIComponent('Никитин');
    const responseOk = await request(app).get(`/persons/firstname/${firstname}/lastname/${lastname}`);
    expect(responseOk.status).toBe(200);
  });

  test('404 [Data not found]', async () => {
    const app = startServer();
    const firstname = encodeURIComponent('Джон');
    const lastname = encodeURIComponent('Адамс');
    const responseNoData = await request(app).get(`/persons/firstname/${firstname}/lastname/${lastname}`);
    expect(responseNoData.status).toBe(404);
  });

  test('400 [Bad Request]', async () => {
    const app = startServer();
    const firstname = 'Invalid';
    const lastname = 'Data';
    const responseInvalidData = await request(app).get(`/persons/firstname/${firstname}/lastname/${lastname}`);
    expect(responseInvalidData.status).toBe(400);
  });
});

describe('getCommentByPersonId', () => {
  test('200 [OK]', async () => {
    const app = startServer();
    const personId = 1;
    const responseOk = await request(app).get(`/comments/${personId}`);
    expect(responseOk.status).toBe(200);
  });

  test('404 [Data not found]', async () => {
    const app = startServer();
    const personId = 100000;
    const responseNoData = await request(app).get(`/comments/${personId}`);
    expect(responseNoData.status).toBe(404);
  });

  test('400 [Bad Request]', async () => {
    const app = startServer();
    const personId = 'invalid data';
    const responseInvalidData = await request(app).get(`/comments/${personId}`);
    expect(responseInvalidData.status).toBe(400);
  });
});

describe('addPerson', () => {
  test('201 [OK]', async () => {
    const app = startServer();
    const body = {
      phone: '+7 (000) 000-00-00',
      createdAt: 1689945054000,
    };
    const responseOk = await request(app).post('/persons/add').type('json').send(body);
    expect(responseOk.status).toBe(201);
  });

  test('400 [Bad Request]', async () => {
    const app = startServer();
    const body = {
      firstname: 'Джон',
      lastname: 'Адамс',
      createdAt: 1689945054000,
    };
    const responseInvalidData = await request(app).post('/persons/add').type('json').send(body);
    expect(responseInvalidData.status).toBe(400);
  });
});

describe('addComment', () => {
  test('201 [OK]', async () => {
    const app = startServer();
    const body = {
      personId: 1,
      text: 'Текст комментария',
      createdAt: 1689945054000,
    };
    const responseOk = await request(app).post('/comments/add').type('json').send(body);
    expect(responseOk.status).toBe(201);
  });

  test('400 [Bad Request]', async () => {
    const app = startServer();
    const body = {
      personId: 'incorrectId',
      text: 'Текст комментария',
      createdAt: 1689945054000,
    };
    const responseInvalidData = await request(app).post('/persons/add').type('json').send(body);
    expect(responseInvalidData.status).toBe(400);
  });
});

describe('sendFeedback', () => {
  test('201 [OK]', async () => {
    const app = startServer();
    const body = {
      text: 'Test mail body content',
    };
    const responseOk = await request(app).post('/send-feedback').type('json').send(body);
    expect(responseOk.status).toBe(201);
  });

  test('400 [Bad Request]', async () => {
    const app = startServer();
    const body = {
      text: '',
    };
    const responseInvalidData = await request(app).post('/send-feedback').type('json').send(body);
    expect(responseInvalidData.status).toBe(400);
  });
});
