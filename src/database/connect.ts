import mysql from 'mysql2';
import { oldDatabaseCredits, newDatabaseCredits } from '../const/databaseCredits.js';
import type { Connection } from 'mysql2';

export const toConnect = (dbType: 'old' | 'new', verbose = false): Connection => {
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

export const closeConnection = (connection: Connection, verbose = false): void => {
  connection.end((error) => {
    if (error) {
      return console.error(`💀 Connection closing is failed. Reason: ${error}`);
    }
    if (verbose) {
      console.info(`🔌 Connection is closed`);
    }
  });
};
