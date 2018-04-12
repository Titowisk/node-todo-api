const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users');

// Todo.remove({}).then((res) => {
//     console.log(res);
// });


Todo.findByIdAndRemove('5ac7812319aae3572cdd285e').then((todo) => {
    console.log(todo);
});