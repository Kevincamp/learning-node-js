const path = require('node:path')

// barrar separadora de carpetas segun SO
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// nombre del fichero + extension
const base = path.basename('/tmp/midu/password.txt')
console.log(base)

// nombre del fichero
const filename = path.basename('/tmp/midu/password.txt', 'txt')
console.log(filename)

// extesion del archivo
const extension = path.extname('my.super.image.jpg')
console.log(extension)