# Program lifecycle & event loop.md

a difference from regular Js, node.js has some core modules used for handled some typical tasks about programming logic:
- http
- fs
- path
- ...

any module can be imported in our code with the "require" method, also offered by node.js by default

```js
const http = require("http")
const fs = require("fs")
const path = require("path")
```

and also can import local files:

```js
const requestHandler = require("./routes")
```


Node.js runs non-blocking js code usging the event driven code (Event loop) for running the logic.

The event loop never ends until every event is handled.

All of this is maded by asynchronous code with functions:

```js
const consoleLogger = () => {
    console.log("I'm a reusable function :D")   
}

setTimeout(consoleLogger, 50)
setInterval(consoleLogger, 50)
anyOtherFunction(consoleLogger)
```


In web applications always there is a main event running (the listen method from "create server"):

```js
const http = require('http')

const server = http.createServer((req, res) => {
    // The logic here
})

// This create a never ends event
server.listen(2000)
```

The requests and responses in node.js apps, use the stream & buffers utilities:

```js
const data = Buffer.concat(body).toString()
```