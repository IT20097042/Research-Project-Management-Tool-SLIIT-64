const { request } = require('express');
const User = require('../models/user');
const server = require('../server');

const user1 = {
    full_name : 'John Doe',
    student_id : 'ST001',
    email : 'john123@gmail.com',
    password : 'abc123',
    research_area : 1,
    user_type : 2
}

beforeEach(() =>{
    await User.deleteMany({})
    await User(user1).save();
})

test('Should register a new member', async () =>{
    await request(server).post('/user')
    .send({
        full_name : 'Adam',
        student_id : 'ST001',
        email : 'john123@gmail.com',
        password : 'abc123',
        research_area : 1,
        user_type : 2
    })
    .expect(201)
})