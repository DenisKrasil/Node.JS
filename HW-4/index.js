const express = require('express')
const path = require('path')
const fs = require(`fs`)
const joi = require('joi')
const { v4: uuidv4 } = require('uuid')

const userSchema = joi.object({
    firstName: joi.string().min(2).required(),
    secondName: joi.string().min(2).required(),
    age: joi.number().min(0).required(),
    city: joi.string().min(2)
})


const app = express()
const userDBPath = path.join(__dirname, "users.json")

// let uniqueID = 1

app.use(express.json())

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDBPath))
    res.send({ users })
})

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDBPath))
    const foundUser = users.find(user => {
        return user.id === req.params.id
    })
    res.send({ user: foundUser })
    if (foundUser) {
        res.send({ user: foundUser });
    } else {
        res.status(404);
        res.send({ user: null });
    }
})

app.post('/users', (req, res) => {
    const resultValidation = userSchema.validate(req.body)
    if (resultValidation.error) {
        return res.status(404).send({ error: resultValidation.error.details });
    }
    uniqueID = uuidv4()
    const users = JSON.parse(fs.readFileSync(userDBPath))
    users.push({ id: uniqueID, ...req.body })
    fs.writeFileSync(userDBPath, JSON.stringify(users))
    res.send({ id: uniqueID })
})

app.put('/users/:id', (req, res) => {
    const resultValidation = userSchema.validate(req.body)
    if (resultValidation.error) {
        return res.status(404).send({ error: resultValidation.error.details })
    }
    const users = JSON.parse(fs.readFileSync(userDBPath))
    const foundUser = users.find(user => {
        return user.id === req.params.id
    })
    if (foundUser) {
        foundUser.firstName = req.body.firstName
        foundUser.secondName = req.body.secondName
        foundUser.age = req.body.age
        foundUser.city = req.body.city
        fs.writeFileSync(userDBPath, JSON.stringify(users))
        res.send({ user: foundUser })
    } else {
        res.send({ user: null })
    }
})

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDBPath))
    const userIndex = users.findIndex(user => {
        return user.id === req.params.id
    })
    if (userIndex === -1) {
        res.send({ user: null })
    } else {
        users.splice(userIndex, 1)
        fs.writeFileSync(userDBPath, JSON.stringify(users))
        res.send({ id: req.params.id })
    }
})


app.listen(3000)