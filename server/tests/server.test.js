// External
const expect = require('expect');
const request = require('supertest');

// Local
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Sets the database before each test
beforeEach((done) => {
    Todo.remove({}).then(() => done()); // removes all data from Todo collection before each test
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
                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    })
});