const express = require('express')
const app = express()

const User = require('./models/user.js')

const port = process.env.PORT || 3000

app.use(express.json());


app.post('/users', async (req, res) => { // users will create in the mongoDB

    try {
        const user = new User(req.body)
        await user.save();
        res.status(201)
        res.send(user)
    } catch (error) {
        res.status(400)
        res.send(error)
    }

})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (er) {
        res.send(er)
    }
})

app.get('/users/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send("not found")
        }
        res.send(user)
    } catch (er) {
        res.send(er)
    }
})


app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedValues = ["name", "password", "age", "email"];
    const isValid = updates.every((update) => {
        return allowedValues.includes(update)
    })

    if (!isValid) {
        return res.status(400).send("Error: Invalid Updates!")
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) {
            return res.status(404).send("Not found!")
        }
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send("Not found!")
        }

        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

app.listen(port, () => {
    console.log("Working on port: " + port);
})