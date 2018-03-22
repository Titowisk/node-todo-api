const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    } else {
        console.log('Connected to MongoDB server.');
    }

    // using arrow function
    // db.collection('Todos').find().toArray((error, documents) => {
    //     if (error) {
    //         return console.log('Unable to fetch todos', error);
    //     }
    //     console.log('todos');
    //     console.log(JSON.stringify(documents, undefined, 2));
    // });

    // using Promises (the way the professor did)
    // db.collection('Todos').find(
    //     {_id: new ObjectID("5aa2e8428cb2bf91fae63d4b")}
    // ).toArray().then((docs) => {
    //     console.log('todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', error);
    // });

    // Count Method
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', error);
    // });
    
    // CHallenge
    db.collection('Users').find({name: "Vitor Ribeiro"}).toArray().then((count) => {
        console.log("Users:");
        console.log(JSON.stringify(count, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', error);
    });

    // this returns the addresses of all the documents in the database, not the document themselves
    // toArray() fetches the documents

// db.collection(<collection-name>).insertOne(<document-to-insert>, <callback-function>);
// .insertOne() will insert a document into the collection, and the callback will handle a possible error.

});


// API Fetching Data http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud/