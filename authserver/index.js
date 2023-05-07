const http = require('node:http')
const fs = require('node:fs')
const { URLSearchParams } = require('node:url')

const { randomString } = require('./crypt')

const router = {}

router['/login'] = (req, res, callback) => {
    const params = new URLSearchParams(req.payload)
    res.setHeader('Location', `${params.get('redirect_uri')}?code=123bla&state=${params.get('state')}`)
    callback(302)
}

router['/oauth/token'] = (req, res, callback) => {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({
        "token_type": "Bearer",
        "expires_in": 86400,
        "access_token": randomString(64),
        "scope": "photo offline_access",
        "refresh_token": randomString(48)
    }), 'utf8')
    callback(200)    
}

const server = http.createServer((req, res) => {
    const html = fs.readFileSync('index.html')

    let buffer = ''

    req.on('data', (data) => {
        buffer += data
    })

    req.on('end', () => {

        console.log(req.url)

        const payload = Buffer.from(buffer).toString('utf8')
        const cleanReq = {
            payload,
            url: req.url
        }

        let chosenHandler = router[req.url]

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        if (chosenHandler !== undefined) {

            chosenHandler(cleanReq, res, (status) => {
                console.log('Request received:', payload)
                res.statusCode = status
                res.end()
            })
        } else {
            res.statusCode = 200
            res.end(html)

        }
    })

})

server.listen('8000', () => console.log('Server up!'))
