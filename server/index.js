const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const uri = 'mongodb+srv://node-shop:node-shop@node-api-shop-gsisn.mongodb.net/node-admin?retryWrites=true&w=majority'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((response, error) => {
    console.log('connected')
}).catch(error => {
    console.log(error);
})

const posts = require('./routes/api/posts')

app.use('/api/posts', posts)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))

    app.get('/.*/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}


app.listen(3000, (req, res) => {
    console.log('Running on 3000')
})