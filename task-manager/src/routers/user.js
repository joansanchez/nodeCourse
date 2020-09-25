const express = require('express')
const router = express.Router()

const User = require('./../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e){
        res.status(400).send(e)
    }
    
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send()
    }
    
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
    
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((item) => allowUpdate.includes(item))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }
    
    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()

        if (!user) return res.status(404).send()
        res.send(user)

    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router