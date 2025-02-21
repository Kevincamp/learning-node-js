import { Router } from 'express'
import { readJSON } from '/utils.js'
import { randomUUID } from 'node:crypto'
import { validateMovie } from '../schemas/movies'

const movies = readJSON('./movies.json')
export const movieRouter = Router()

const router = Router()

movieRouter.get('/', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filteredMovies)
  }

  res.json(movie)
})

movieRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(401).json({ message: 'Movie not found' })
})

movieRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }
  // const { title, gender, year, director, duration, rate, poster } = req.body

  const newMovie = {
    id: randomUUID(),
    ...result.data,
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

movieRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
})

movieRouter.patch('/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((moview) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updateMovie
  return res.json(updateMovie)
})
