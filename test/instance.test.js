import EasySave from '../lib/index';
import should from 'should';
import {expect} from 'chai';

describe("Test to Construct Object", done => {
    
  it("Should create object with success to AWS", done => {
    var newConnect = new EasySave({
      AWS_S3_ACCESS_KEY: 'any',
      AWS_S3_SECRET: 'any'
    }, 'aws', 'targetFolder');
    
    const local = newConnect.getLocal();
    const params = newConnect.getParams();
    const target = newConnect.getTarget();

    local.should.equal('aws');
    params.should.have.property('config');
    target.should.equal('targetFolder');
    done();
  });

  it("Should create object with success to Local", done => {
    var newConnect = new EasySave({}, 'local', 'targetFolder');
    
    const local = newConnect.getLocal();
    const target = newConnect.getTarget();

    local.should.equal('local');
    target.should.equal('targetFolder');
    done();
  });

  it("Should return error case not set first attribute", done => {
    expect(() => {
      new EasySave();
    }).throw(Error, 'First parameter is required');
    done();
  });

  it("Should return error case not set first param to AWS", done => {
    expect(() => {
      new EasySave({
        AWS_S3_SECRET: 'any'
      }, 'aws', 'targetFolder');
    }).throw(Error, 'AWS Key can not be empty');
    done();
  });

  it("Should return error case not set second param to AWS", done => {
    expect(() => {
      new EasySave({
        AWS_S3_ACCESS_KEY: 'any'
      }, 'aws', 'targetFolder');
    }).throw(Error, 'AWS Key can not be empty');
    done();
  });

  it("Should return error case second param null to AWS", done => {
    expect(() => {
      new EasySave({
        AWS_S3_ACCESS_KEY: 'any',
        AWS_S3_SECRET: null
      }, 'aws', 'targetFolder');
    }).throw(Error, 'AWS Key can not be empty');
    done();
  });

  it("Should return error case first param null to AWS", done => {
    expect(() => {
      new EasySave({
        AWS_S3_ACCESS_KEY: null,
        AWS_S3_SECRET: 'any'
      }, 'aws', 'targetFolder');
    }).throw(Error, 'AWS Key can not be empty');
    done();
  });

  it("Should return error case second param empty to AWS", done => {
    expect(() => {
      new EasySave({
        AWS_S3_ACCESS_KEY: '',
        AWS_S3_SECRET: 'any'
      }, 'aws', 'targetFolder');
    }).throw(Error, 'AWS Key can not be empty');
    done();
  });

  it("Should return error case first param empty to AWS", done => {
    expect(() => {
      new EasySave({
        AWS_S3_ACCESS_KEY: 'any',
        AWS_S3_SECRET: ''
      }, 'aws', 'targetFolder');
    }).throw(Error, 'AWS Key can not be empty');
    done();
  });

});
