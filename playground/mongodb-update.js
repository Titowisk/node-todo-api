const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    } else {
        console.log('Connected to MongoDB server.');
    }

    // findOneAndUpdate(filter, update, options, callback)
    // db.collection('Todos').findOneAndUpdate({
    //     //filter
    //     _id: new ObjectID("5ab3f6ae605894b6828d4ebd")
    // }, {
    //     // mongodb update operators: https://docs.mongodb.com/manual/reference/operator/update/    
    //     // update    
    //     $set: {completed: true}
    // }, {
    //     // options
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

    // Challenge
    db.collection('Users').findOneAndUpdate(

        {_id: new ObjectID("5aa2dab42d06e720d858ea06")},
        {$set: {name: 'Vitor'}, $inc: {age: +1}},
        {returnOriginal: false}
        
    ).then((result) => {console.log(result);})

});


// API Fetching Data http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud/