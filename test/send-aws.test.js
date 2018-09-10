import EasySave from '../lib/save-file';
import pic from './image';
import should from 'should';
import {expect} from 'chai';

const newConnect = new EasySave({
  AWS_S3_ACCESS_KEY: 'any',
  AWS_S3_SECRET: 'any'
}, 'aws', {
  bucket: 'BucketExample',
  folder: 'Folder'
});

describe("Test to save aws file", done => {
    
  it("Should send file to aws with success", done => {
    newConnect.save(pic)
      .then(res => {
        return res;
      })
      .catch (err => {
        return err;
      })
      .then(res => {
        let returnValue = res.split('/');
        returnValue = `${returnValue[0]}/${returnValue[1]}/`;
        returnValue.should.equal('BucketExample/Folder/');
        done();
      });
  });

  it("Should not send file when input base64 wrong", done => {
    newConnect.save('asdasd')
      .then(res => {
        return res;
      })
      .catch (err => {
        return err;
      })
      .then(res => {
        res.should.equal('String not is Base64');
        done();
      });
  });

  it("Should not send file when not send input", done => {
    newConnect.save()
      .then(res => {
        return res;
      })
      .catch (err => {
        return err;
      })
      .then(res => {
        res.should.equal('File input required');
        done();
      });
  });

});
