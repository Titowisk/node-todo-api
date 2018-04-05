// External
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// Local
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: "First test todo"
    },
    {
        _id: new ObjectID(),
        text: "Second test todo"
    }
];

// Sets the database before each test
beforeEach((done) => {
    Todo.remove({}).then(() => { // removes all data from Todo collection before each test
        return Todo.insertMany(todos); // using return allow to chain callbacks
    }).then(() => done()); 
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = "Test todo text";

        // tests the response
        request(app)
            .post('/todos') // faz o post
            .send({text}) // envia o texto contido na variavel acima
            .expect(200) // espera que o status code seja 200
            .expect((res) => { 
                expect(res.body.text).toBe(text); // espera que o body da resposta seja o texto indicado
            })
            .end((err, res) => {
                if (err) {
                    return done(err); // return to stop the function exectuion in case of an error
                }
                // tests the database
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    })
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done); // no need to use a callback because there is nothing asynchronous here
    })
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`) // toHexString converts object to string
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var invalidID = '5ac63715f9f09284291a28a5'; // switched last number from 4 to 5
        // the way the professor did:
        //var hexId = new ObjectID().toHexString(); this generate a random id
        request(app)
            .get(`/todos/${invalidID}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-objects ids', (done) => {
        var nonObjectID = '12345';
        request(app)
            .get(`/todos/${nonObjectID}`)
            .expect(404)
            .end(done);
    });
});