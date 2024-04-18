import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
// @ts-ignore
import {hash,genSalt,compare} from 'bcrypt'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const salt = await genSalt(10)
    const password = await hash(body.password,salt)
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'users',
        Promise: bluebird,
    })
    const [rows, fields] = await connection.execute(
        "INSERT INTO user (login, password) VALUES (?,?)", [body.login,password])
    if (rows){
        event.context.session.users = rows
        return {
            users: rows
        }
    }

    connection.end()
});
