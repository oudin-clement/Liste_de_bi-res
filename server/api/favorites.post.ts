import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'beersfav',
        Promise: bluebird,
    })
    const [rows, fields] = await connection.execute(
        "INSERT INTO favorite_beers (id) VALUES(?)", [body.id])
    return {
        beers: rows
    }
    connection.end()
});
