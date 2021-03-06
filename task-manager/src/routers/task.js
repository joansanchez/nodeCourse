const express = require('express')
const router = express.Router()

const Task = require('../models/task')
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        author: req.user._id
    })

    try {
        const taskCreated = await task.save()
        res.status(201).send(taskCreated)
    } catch (error) {
        res.status(400).send(e)
    }
})

//GET /tasks?completed=true/false
//GET /tasks?limit=10&skip=20 (skipping the first 20 results and asking for the next 10)
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {} //1 ascending, -1 descending
    
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            } 
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, author: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'completed']
    const isValidOperation = updates.every((item) => validUpdates.includes(item))
    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates'})

    try {
        const task = await Task.findOne({_id: req.params.id, author: req.user._id})

        if(!task) return res.status(404).send()

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})



router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, author: req.user._id})
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router