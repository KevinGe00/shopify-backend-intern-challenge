// Testing for CRUD operations of our image schema
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
const imageModel = require('../models/image');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Images', () => {
    beforeEach((done) => { //Empty test database at the start of tests
        imageModel.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET all image', () => {
        it('it should GET all the image', (done) => {
            chai.request(server)
                .get('/api/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
   * Test the /POST route
   */
    describe('/POST an image', () => {
        it('it should not POST an image without width field', (done) => {

            chai.request(server)
                .post('/api/upload')
                .field("name", "smiley")
                .field("desc", "a smiley face")
                .field("height", 100)
                .attach("img", "./test/smiley.png")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.not.have.property('width');
                    done();
                });
        });
        it('it should POST an image with no errors ', (done) => {
            chai.request(server)
                .post('/api/upload')
                .field("name", "smiley")
                .field("desc", "a smiley face")
                .field("width", 100)
                .field("height", 100)
                .attach("img", "./test/smiley.png")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});