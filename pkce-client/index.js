const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
    const html = fs.readFileSync('index.html')


    res.statusCode = 200
    res.end(html)
})

server.listen('9000', () => console.log('Server up!'))
