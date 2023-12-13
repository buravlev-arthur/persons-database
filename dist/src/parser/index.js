import 'dotenv/config';
import { toConnect, closeConnection } from '../database/connect.js';
import createNewTables from './createNewTables.js';
import getModifiedData from './modifyOldData.js';
import fillNewTables from './fillNewTables.js';
export default async () => {
    const connectionNewDB = toConnect('new', true);
    const connectionOldDB = toConnect('old', true);
    await createNewTables(connectionNewDB);
    const persons = await getModifiedData(connectionOldDB);
    await fillNewTables(connectionNewDB, persons);
    closeConnection(connectionNewDB, true);
    closeConnection(connectionOldDB, true);
};
