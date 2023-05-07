const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
    
    const path = req.url

    console.log(path)

    let file

    switch(path) {
        case '/sha256.js':
            file = 'sha256.js'
            break
        default:
            file = 'index.html'
            break
    }

    const html = fs.readFileSync(`.${file}`) 

    res.statusCode = 200
    res.end(html)
})

server.listen('9000', () => console.log('Server up!'))
