const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users');

// var id = '5ac63715f9f09284291a28a4';

// if (!ObjectID.isValid(id)) {
//     console.log('ID is not valid.')
// }

// Todo.find({
//     _id: id // no need to convert it to a object
// }).then((todo) => {
//     console.log('Todos: ', todo);
// });

// Todo.findOne({
//     _id: id // no need to convert it to a object
// }).then((todo) => {
//     console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) { // in case a valid non-existent id is queried
//         return console.log('ID not found');
//     }
//     console.log('Todo: ', todo);
// }).catch((e) => console.log(e)); // In case a invalid ID is queried

User.findById('5ab52dcd62b447ac24ee9ab6').then((user) => {
    if(!user) {
        return console.log('ID not found.');
    }
    console.log('User: ', user);
}).catch((e) => console.log(e));