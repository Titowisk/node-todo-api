// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // this is the same as above, but using the object destructuring

// This way we can create unique objects ID
var obj = new ObjectID();
console.log(obj);

// ES6 new feature: object destructuring
// var user = {name: 'Andrew', age: 25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    } else {
        console.log('Connected to MongoDB server.');
    }
// MongoCLient.connect(<url>, options(optional), callback)

    // db.collection('Todos').insertOne({
    //     text: 'Something to Do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Vitor Ribeiro',
    //     age: 28,
    //     location: '594 Raul Leite Street'

    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    // db.collection(<collection-name>).insertOne(<document-to-insert>, <callback-function>);
    // .insertOne() will insert a document into the collection, and the callback will handle a possible error.

    db.close();
});


// API connect http://mongodb.github.io/node-mongodb-native/3.0/reference/connecting/connection-settings/
// API insertOne http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud/
// CRUD means (Create, Read, Update and Delete)