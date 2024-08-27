import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
    let dbFilename = `./db/docs.sqlite`;

    if (process.env.NODE_ENV === 'test') {
        dbFilename = "./db/test.sqlite";
    }

    const db = await open({
        filename: dbFilename,
        driver: sqlite3.Database
    });

    // Execute the SQL command to create the table if it doesn't exist
    await db.exec(`CREATE TABLE IF NOT EXISTS documents (
        title TEXT,
        content TEXT,
        created_at DATE DEFAULT (datetime('now','localtime'))
    )`);

    return db;
}


export default openDb;
