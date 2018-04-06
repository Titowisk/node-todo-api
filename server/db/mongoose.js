var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configs mongoose to use Promises
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/1777812
let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://tito:08093941@ds237389.mlab.com:37389/node-todo-api'
  };
//   mongoose.connect( db.localhost || db.mlab); didn't worked
mongoose.connect( db.localhost || db.mlab );

module.exports = {
    mongoose
};