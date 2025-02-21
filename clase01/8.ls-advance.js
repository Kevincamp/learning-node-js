const { stat } = require('node:fs')
const path = require('node:path')
const fs = require('node:fs/promises')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls(folder) {
    let files 

    try {
        files = await fs.readdir(folder)
    } catch {
        console.error(pc.red(`No se pudo leer el directorio ${folder}`))
        process.exit(1)
    }

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let stats 
        try {
            stats = await fs.stat(filePath)
        } catch {
            console.log(`No se pudo leer el directorio ${filePath}`)
            process.exit(1)
        }
    
        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : '-'
        const fileSize = stats.size.toString()
        const fileModified = stats.mtime.toLocaleDateString()
    
        return `${fileType} ${pc.blue(file.padEnd(30))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`
    })

    const filesInfo = await Promise.all(filesPromises)
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)