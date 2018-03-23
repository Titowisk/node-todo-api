var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configs mongoose to use Promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlenght: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// var todo1 = new Todo({
//     text: 'Cook dinner'
// });

// todo1.save().then((doc) => {
//     console.log('Saved todo: ', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

// challenge
// User
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1
    }
});

var user1 = new User({
    email: 'rabelo59@hotmail.com'
});

user1.save().then((doc) => {
    console.log('Savend user: ', doc);
}, (e) => {
    console.log('Unable to save user');
});