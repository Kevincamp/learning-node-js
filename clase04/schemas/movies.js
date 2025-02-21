const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title should be text',
    required_error: 'Movie title is required',
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(100),
  poster: z.string().url({
    message: 'Poster should be a valid URL',
  }),
  genre: z.array(z.enum(['Action', 'Drama', 'Romance', 'Scify', 'Comedy'])),
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

module.exports = {
  validateMovie,
}
