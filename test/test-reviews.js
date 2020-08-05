const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();
const Review = require('../models/review');

chai.use(chaiHttp);

describe('Reviews', () => {
    // TEST INDEX
    it('should index ALL reviews on /GET', done => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST NEW
    it('should display new form on /reviews/new GET', done => {
        chai.request(server)
            .get(`/reviews/new`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
    // TEST CREATE
    // TEST SHOW
    // TEST EDIT
    // TEST UPDATE
    // TEST DELETE
});
