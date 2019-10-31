// implement your API here
const express = require('express');

const server = express();

const dbUser = require('./data/db')

server.listen(8000, () => {
    console.log('=== server listening on port 8000 ===');
});

server.get('/', (req, res) =>{
    console.log('Testing get')

    res.send('hello world...')
})

// ! GET request to /api/users
server.get('/api/users', (req, res) => {
    dbUser.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved.", err})
        })
})

// ! GET request to /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id   

    dbUser.findById(id)
        .then(user => {
        if(user){
            res.status(200).json({success: true, user})
        } else {
            res.status(404).json({success: false, message: `The user with the specified ID ${id} does not exist.`})
        }
        })
        .catch(err => {
            res.status(500).json({err: `The user information could not be retrieved.`, err})
        })
    })
