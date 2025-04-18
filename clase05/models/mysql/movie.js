import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
    static async getAll({ genre }) {
        const [movies] = await connection.query(`SELECT title, 
                                                    year, 
                                                    director, 
                                                    duration, 
                                                    poster, 
                                                    rate, 
                                                    BIN_TO_UUID(id) id 
                                                FROM movie;`)
        return movies
    }

    static async getById({ id }) {
        const [movies] = await connection.query(`SELECT title, 
                                                    year, 
                                                    director, 
                                                    duration,
                                                    poster, 
                                                    rate, 
                                                    BIN_TO_UUID(id) id 
                                                FROM movie 
                                                WHERE id == UUID_TO_BIN(?);`, [id])
        return movies[0]
    }

    static async create({ input }) {

        const {title, year, director, duration, poster, rate} = input 

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        
        const result = await connection.query(
            `INSERT INTO movie(id, title, year, director, duration, poster, rate) 
            VALUES(UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`
            [uuid, title, year, director, duration, poster, rate]
        )

        console
    }

    static async delete({ id }) {

    }

    static async update ({ id, input }) {

    }
}