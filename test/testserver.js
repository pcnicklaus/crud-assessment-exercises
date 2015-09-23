process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-Http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Exercise = require('../server/models/exercise');

var should = chai.should();
chai.use(chaiHttp);

describe('Exercises', function() {

  Exercise.collection.drop();

  beforeEach(function(done){
    var newExercise = new Exercise({
      name: 'Something',
      description: 'A description',
      tags: ['tag']
    });
    newExercise.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Exercise.collection.drop();
    done();
  });

it('should list ALL Exercises on /api/exercises GET', function(done) {
  chai.request(server)
    .get('/api/exercises')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('description');
      res.body[0].should.have.property('tags');
      res.body[0].name.should.equal('Something');
      res.body[0].description.should.equal('A description');
      // res.body[0].tags.should.equal(['tag']);
      done();
    });
  });

  it('should list a SINGLE exercise on /api/exercise/<id> GET', function(done) {
    var newExercise = new Exercise ({
      name: "One",
      description: "Two",
      tags: "[three]"
    });
    newExercise.save(function (err, data) {
      chai.request(server)
        .get('/api/exercise/' + data.id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('tags');
          res.body.name.should.equal('One');
          res.body.description.should.equal('Two');
          // res.body.tags.should.equal(['[three]']);
          done();
        });
    });
  });

  it('should add a SINGLE exercise on /api/exercises POST', function(done) {
    chai.request(server)
      .post('/api/exercises')
      .send({'name': 'Java', 'description': 'Script', 'tags': ['three']})
      .end( function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.should.have.property('description');
        res.body.SUCCESS.should.have.property('tags');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('Java');
        res.body.SUCCESS.description.should.equal('Script');
        done();
      });
  });

  it('should update a SINGLE blob on /api/exercise/<id> PUT', function(done) {
    chai.request(server)
      .get('/api/exercises')
      .end(function (err, res) {
        chai.request(server)
          .put('/api/exercise/' + res.body[0]._id)
          .send({'name': 'HonkeyMagoo'})
          .end( function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('UPDATED');
            res.body.UPDATED.should.be.a('object');
            res.body.UPDATED.should.have.property('name');
            res.body.UPDATED.should.have.property('_id');
            res.body.UPDATED.name.should.equal('HonkeyMagoo');
            done();
          });
      });
  });

  it('should delete a SINGLE blob on /api/exercise/<id> DELETE', function(done) {
    chai.request(server)
      .get('/api/exercises')
      .end(function (err, res) {
        chai.request(server)
          .delete('/api/exercise/' + res.body[0]._id)
          .end( function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('DELETED');
            res.body.DELETED.should.be.a('object');
            res.body.DELETED.should.have.property('name');
            res.body.DELETED.should.have.property('description');
            res.body.DELETED.should.have.property('_id');
            res.body.DELETED.name.should.equal('Something');
            res.body.DELETED.description.should.equal('A description');
            done();
          });
      });

  });

});
