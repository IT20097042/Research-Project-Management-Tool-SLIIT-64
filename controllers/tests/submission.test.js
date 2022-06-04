const { request } = require('express');
const Submission = require('../models/submission');
const server = require('../server');

const submission1 = {
    project : CRUD,
    status : 'Pending',
    comments : 'Good',
    submission_type : 2,
    file_name : 'crud_api',
    file_link : 'Documents',
    assign_to : ABC,
    is_deleted : false,
    modified_by : PQR,
    created_by : XYZ
}

beforeEach(() =>{
    await Submission.deleteMany({})
    await Submission(submission1).save();
})

test('New Submission', async () =>{
    await request(server).post('/api/submission')
    .send({
        project : TEST_A,
        status : 'Pending',
        comments : 'Intermediate',
        submission_type : 2,
        file_name : 'test_api',
        file_link : 'Documents',
        assign_to : ABC,
        is_deleted : false,
        modified_by : PQR,
        created_by : XYZ
    })
    .expect(201)
})