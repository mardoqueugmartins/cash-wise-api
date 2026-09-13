import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.use(express.json())

app.get('/api/users', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users;')

    res.json(results)
})

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).json(body)
})

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`),
)
