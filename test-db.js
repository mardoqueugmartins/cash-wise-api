import 'dotenv/config'
import { pool } from './src/db/postgres/helper.js'

console.log('Iniciando teste...')

try {
    const client = await pool.connect()

    console.log('✅ Conectado ao PostgreSQL!')

    const result = await client.query('SELECT NOW()')

    console.log(result.rows)

    client.release()
} catch (error) {
    console.error(error)
}

process.exit(0)
