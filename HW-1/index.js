// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require('http')
let homeCounter = 0
let aboutCounter = 0
const server = http.createServer((req, res) => {



    if (req.url === '/') {
        homeCounter++
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
        })

        res.end(`<a href="../about">About</a>
        <p>Вы зашли на страницу ${homeCounter} раз</p>`)
    } else if (req.url === '/about') {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
        })
        aboutCounter++
        res.end(`<a href="../">Home</a>
        <p>Вы зашли на страницу ${aboutCounter} раз</p>`)

    } else {
        res.writeHead(404, {
            "Content-Type": "text/html; charset=UTF-8"
        })
        res.end(`<h1>Page not found`)
    }
})

server.listen(3000)

