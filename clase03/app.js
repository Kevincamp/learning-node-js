const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')

const movies = require('./movies.json')
const { validateMovie } = require('./schemas/movies.js')

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'http://movies.com',
        'http://kvncamp.com',
      ]

      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
)
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filteredMovies)
  }

  res.status(401).json({ message: 'Movie not found' })
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(401).json({ message: 'Movie not found' })
})

app.get('/movies/:genre', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filteredMovies)
  }

  res.status(401).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }
  // const { title, gender, year, director, duration, rate, poster } = req.body

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
  }

  res.send(200)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`listening to port http://localhost:${PORT}`)
})
