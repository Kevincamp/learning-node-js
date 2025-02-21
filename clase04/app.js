import cors from 'cors'
import express, { json } from 'express'
import { movieRouter } from './routes/movies'
import { corsMiddleware } from './middlewares/cors'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/movies', movieRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`listening to port http://localhost:${PORT}`)
})
