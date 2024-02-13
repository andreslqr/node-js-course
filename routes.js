const fs = require('fs')

const requestHandler = (req, res) => {
    if(req.url == '/' && req.method == 'GET') {
        res.setHeader('Content-Type', 'text/html')
        res.write("<html>")
        res.write("<head><form method='POST'><input type='text' name='name'><input type='submit'></head>")
        res.write("<body><h1>hola</h1></body>")
        res.write("</html>")
        return res.end()
    }

    if(req.url == '/' && req.method == 'POST') {
        const body = []
        req.on('data', chunk => {
            console.log(chunk)
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString().split('=')[1]
            fs.writeFile('messages.txt', parsedBody, err => {
                res.end()
            })
        })
    }
}

module.exports = requestHandler