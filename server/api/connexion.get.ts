import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
// @ts-ignore
import {hash, genSalt, compare} from 'bcrypt'

export default defineEventHandler(async (event) => {


        const body = event.headers.get("Authorization")
        const b64 = body!.split(" ")[1]
        const res = atob(b64)
        const login = res.split(":")[0]
        const password = res.split(":")[1]

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'users',
            Promise: bluebird,
        })

        const [rows, fields] = await connection.execute(
            "SELECT password FROM user WHERE login = ?", [login])
        // @ts-ignore
        const result = await compare(password, rows[0].password)
        return {
            connecte:result
        }
    }
);
