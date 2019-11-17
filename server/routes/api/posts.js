const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()


// model
var postSchema = new mongoose.Schema({
    title: String
}, {
    collection: 'posts'
});

const postModel = mongoose.model('Post', postSchema)

// get
router.get('/', async (req, res) => {
    const posts = await postModel.find()
    res.send({
        posts
    })
})
//add
router.post('/', (req, res) => {
    const createdPost = new postModel({
        title: req.body.title
    })

    return createdPost.save().then(response => {
        res.send({
            message: response
        })
    })
})
//delete

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    postModel.deleteOne({
        _id: id
    }).then(response => {
        res.send({
            message: response
        })
    })
})

module.exports = router