var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configs mongoose to use Promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};