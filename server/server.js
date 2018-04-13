// External imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

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
const port = process.env.PORT || 3000;

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
        return res.status(404).send(); // Problem 1: ID can be invalid
    }
    Todo.findById(id).then((todo) => {
        if(todo) {
            res.send({todo});
        } else {
            res.status(404).send(); // Problem 2: No todos registered
        }
    }).catch((e) => {
        res.status(400).send(); // Problem 3: An error connecting to database
    });

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(todo){
            res.status(200).send({todo});
        } else {
            res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send();
    });

});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // lodash is used here to pick only the attributes wanted
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    // if body.completed is bollean and is true:
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo) => {
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    });

});

app.listen(port, () => {
    console.log(`Started on port: ${port}`);
});

module.exports = {app};