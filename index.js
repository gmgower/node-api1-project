// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db')

server.listen(8000, () => {
    console.log('=== server listening on port 8000 ===');
});

server.get('/', (req, res) =>{
    console.log('Testing get')

    res.send('hello world...')
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved.", err})
        })

})