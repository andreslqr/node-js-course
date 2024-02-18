const http = require('http')

const server = http.createServer((req, res) => {
    
    if(req.method === 'GET' && req.url === '/') {
        res.write('<html><head></head><body>')
        res.write('<h1>Welcome to the "welcome page" </h1>')
        res.write(`
            <form action="/create-user" method="POST">
                <input name="username" required>
                <input type="submit">
            </form>
        `)
        res.write('</body></html>')

        return res.end()
    }
    if(req.method === 'GET' && req.url === '/users') {
        res.write('<html><head></head><body>')

        const users = ['regular guy 1', 'regular guy 2', 'another guy 3']
        res.write('<ul>')
        users.forEach(user => res.write(`<li>${user}</li>`))
        res.write('</ul>')
        res.write('</body></html>')

        return res.end()
    }
    if(req.method === 'POST' && req.url === '/create-user') {

        const body = []
        req.on('data', chunk => body.push(chunk))

        return req.on('end', () => {
            const username = Buffer.concat(body).toString().split('=')[1]
            console.log(`The username is: ${username}`)

            res.statusCode = 302
            res.setHeader('Location', '/users')

            return res.end()
        })
    }
    
})

server.listen(3000)