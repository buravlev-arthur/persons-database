import mysql from 'mysql2';
import { oldDatabaseCredits, newDatabaseCredits } from '../const/databaseCredits.js';
export const toConnect = (dbType, verbose = false) => {
    const connection = mysql.createConnection(dbType === 'old' ? oldDatabaseCredits : newDatabaseCredits);
    connection.connect((error) => {
        if (error) {
            return console.error(`💀 Connection to ${dbType} database is failed. Reason: ${error}`);
        }
        if (verbose) {
            console.info(`📡 Database [${dbType}] connection is established`);
        }
    });
    return connection;
};
export const closeConnection = (connection, verbose = false) => {
    connection.end((error) => {
        if (error) {
            return console.error(`💀 Connection closing is failed. Reason: ${error}`);
        }
        if (verbose) {
            console.info(`🔌 Connection is closed`);
        }
    });
};
