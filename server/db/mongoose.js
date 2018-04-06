var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configs mongoose to use Promises
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/1777812
let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://tito:08093941@ds149268.mlab.com:49268/todoapp'
  };
  mongoose.connect( db.localhost || db.mlab);

module.exports = {
    mongoose
};