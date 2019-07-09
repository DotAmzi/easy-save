import EasySave from '../lib/save-file';
import pic from './image';
import should from 'should';
import {expect} from 'chai';

const newConnect = new EasySave('.', 'local', 'test');

describe("Test to save local file", done => {
    
  it("Should send file to local with success", done => {
    newConnect.save(pic)
      .then(res => {

        return res;
      })
      .catch (err => {
        return err;
      })
      .then(res => {
        console.log(res)
        res.substr(0, 7).should.equal('./test/');
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
