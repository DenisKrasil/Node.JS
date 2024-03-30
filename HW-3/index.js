const express = require('express')
const path = require('path')
const fs = require(`fs`)


const counterPath = path.join(__dirname, 'counters.json')

const counters = {
    home: 0,
    about: 0
}

fs.writeFileSync(counterPath, JSON.stringify(counters))

const app = express()

app.get('/', (req, res) => {
    const count = JSON.parse(fs.readFileSync(counterPath, 'utf8'))
    count.home++
    res.send(`<h1>Welcome Home!</h1> <p>Количество просмотров: ${count.home}</p> <a href="/about">About</a>`)
    fs.writeFileSync(counterPath, JSON.stringify(count))
})

app.get('/about', (req, res) => {
    const count = JSON.parse(fs.readFileSync(counterPath, 'utf8'))
    count.about++
    res.send(`<h1>Welcome About!</h1> <p>Количество просмотров: ${count.about}</p> <a href="/">Home</a>`)
    fs.writeFileSync(counterPath, JSON.stringify(count))
})

app.listen(3000)