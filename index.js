// implement your API here
const express = require('express');

const server = express();

const dbUser = require('./data/db')

server.listen(8000, () => {
    console.log('=== server listening on port 8000 ===');
});

server.use(express.json());

server.get('/', (req, res) =>{
    console.log('Testing get')

    res.send('hello world...')
})

// ! POST request to /api/users
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('body', userInfo)

    dbUser.insert(userInfo)
        .then(user => {
            if(user){
            res.status(201).json({success: true, user})
            } else {
            res.status(400).json({success: false, errorMessage: "Please provide name and bio for the user."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database.", err})
        })
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

// ! PUT request to /api/users/:id
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const userInfo = req.body;

    dbUser.update(id, userInfo)
        .then(user => {
            if(user) {
                res.status(200).json({success: true, user})
            } else {
                res.status(404).json({success: false, message: `The user with the specified ID ${id} does not exist.`})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user information could not be modified.", err})
        })
})

// ! DELETE request to /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    dbUser.remove(id)
        .then(deleteUser => {
            if(deleteUser) {
                res.status(204).end();
            } else {
                res.status(404).json({message: `The user with the specified ID ${id} does not exist.`});
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be removed", err})
        })
})
