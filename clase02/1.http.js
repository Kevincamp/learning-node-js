const http = require('node:http')
const fs = require('node:fs')
const { error } = require('node:console')

const desiredPort = process.env.PORT ?? 1234

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if( req.url === '/'){
        res.end('<h1>Bienvenido a mi pagina de inicio</h1>')

    } else if (req.url === '/imagen-super-bonita.png'){
        fs.readFile('./placa.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1> 500 Internal server error</h1>')
                return
            }

            res.setHeader('Content-Type', 'image/png')
            res.end(data)
        })

    } else if (req.url === '/contacto') {
         res.end('<h1>Contacto</h1>')
         
    } else {
        res.statusCode = 404
         res.end('<h1>Not Found</h1>')
    }
    
})

server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`) 
})