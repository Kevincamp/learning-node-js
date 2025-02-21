import { createRequire } from 'node:module'
const require = create(import.meta.url)
export const readJSON = (path) => require(path)
