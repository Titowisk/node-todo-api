const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    } else {
        console.log('Connected to MongoDB server.');
    }

    // deleteMany (deletes all matches)
    // db.collection('Todos').deleteMany({text:'eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne (deletes only the first match)
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete (delete and return the data deleted)
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // Challenge deleteMany Users collection
    // db.collection('Users').deleteMany({name: 'Vitor Ribeiro'}).then((result) => {
    //     console.log(result);
    // });

    // Challenge findOneAndDelete Users collection
    db.collection('Users').findOneAndDelete(
        {_id: new ObjectID("5aa2e00a4b6cf22bd436ce80")}
    ).then((result) => {
        console.log(result);
    });

});


// API Fetching Data http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud/