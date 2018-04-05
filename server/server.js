// External imports
var express = require('express');
var bodyParser = require('body-parser');

// Local imports
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/users.js');
const {ObjectID} = require('mongodb');

// ES6 new feature: object destructuring
// var user = {name: 'Andrew', age: 25};
// var {name} = user;
// console.log(name);

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// app.get('/todos', (req, res) => {
//     Todo.find().then((todos) => {
//         res.send({todos});
//     }, (e) => {
//         res.status(400).send(e);
//     });
// });

// GET todos/3432434
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID."); // Problem 1: ID can be invalid
    }
    Todo.findById(id).then((todo) => {
        if(todo) {
            res.send({todo});
        } else {
            res.status(404).send("No todos found."); // Problem 2: No todos registered
        }
    }).catch((e) => {
        res.status(400).send("Unable to fetch data."); // Problem 3: An error connecting to database
    });

});

app.listen(3000, () => {
    console.log('Started on port: 3000');
});

module.exports = {app};