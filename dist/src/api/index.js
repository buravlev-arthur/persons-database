import 'dotenv/config';
import Express from 'express';
import cors from 'cors';
import { getPersonByPhone, getPersonByVK, getPersonByName, addPerson, addComment, getCommentById, getCountOfPersons, } from '../database/requests.js';
import { NoDataError, DatabaseError, InvalidParamsError, MailerError } from './entities.js';
import { isValidURL, isValidPhone, isValidName, isValidPersonData, isValidCommentData } from '../helpers/index.js';
import { toSendEmail } from '../helpers/index.js';
export default () => {
    const app = Express();
    app.use(Express.json());
    app.use(cors());
    app.get('/persons/phone/:phone', async (req, res, next) => {
        const { phone } = req.params;
        if (!isValidPhone(phone)) {
            return next(new InvalidParamsError());
        }
        try {
            const data = (await getPersonByPhone(phone));
            if (data.length === 0) {
                return next(new NoDataError());
            }
            res.send(data);
        }
        catch {
            next(new DatabaseError());
        }
    });
    app.get('/persons/vk/:vk', async (req, res, next) => {
        const { vk } = req.params;
        if (!isValidURL(vk)) {
            return next(new InvalidParamsError());
        }
        const url = new URL(vk);
        try {
            const data = (await getPersonByVK(url.pathname));
            if (data.length === 0) {
                return next(new NoDataError());
            }
            res.send(data);
        }
        catch {
            next(new DatabaseError());
        }
    });
    app.get('/persons/firstname/:firstname/lastname/:lastname', async (req, res, next) => {
        const { firstname, lastname } = req.params;
        if (!isValidName(firstname) || !isValidName(lastname)) {
            return next(new InvalidParamsError());
        }
        try {
            const data = (await getPersonByName(firstname, lastname));
            if (data.length === 0) {
                return next(new NoDataError());
            }
            res.send(data);
        }
        catch {
            next(new DatabaseError());
        }
    });
    app.get('/persons/count', async (req, res, next) => {
        try {
            const count = (await getCountOfPersons());
            res.send(String(count));
        }
        catch {
            next(new DatabaseError());
        }
    });
    app.get('/comments/:personId', async (req, res, next) => {
        const { personId } = req.params;
        if (!Number.isInteger(Number(personId))) {
            return next(new InvalidParamsError());
        }
        try {
            const data = (await getCommentById(Number(personId)));
            if (data.length === 0) {
                return next(new NoDataError());
            }
            res.send(data);
        }
        catch {
            next(new DatabaseError());
        }
    });
    app.post('/persons/add', async (req, res, next) => {
        const personData = req.body;
        if (!isValidPersonData(personData)) {
            return next(new InvalidParamsError());
        }
        try {
            const result = await addPerson(personData);
            res.status(201);
            res.send(result);
        }
        catch {
            next(new DatabaseError());
        }
    });
    app.post('/comments/add', async (req, res, next) => {
        const commentData = req.body;
        if (!isValidCommentData(commentData)) {
            return next(new InvalidParamsError());
        }
        try {
            const result = await addComment(commentData);
            res.status(201);
            res.send(result);
        }
        catch {
            next(new DatabaseError());
        }
    });
    app.post('/send-feedback', async (req, res, next) => {
        const data = req.body;
        if (!data.text.length) {
            return next(new InvalidParamsError());
        }
        try {
            const result = await toSendEmail(data.text);
            res.status(201);
            res.send(result);
        }
        catch {
            next(new MailerError());
        }
    });
    app.use((() => {
        const fn = (err, req, res, next) => {
            res.statusCode = err.status;
            res.end(err.message);
            next();
        };
        return fn;
    })());
    return app;
};
