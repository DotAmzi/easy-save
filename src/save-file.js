import AWS from 'aws-sdk';
import os from 'os';
import fs from 'fs';

export default class EasySave {
  constructor(params, local = 'aws', target = '') {

    if(params === undefined) {
      throw new Error('First parameter is required');
    }
    this._local = local;
    this._target = target;
    if (this._local === 'aws') {
      if(
        params.AWS_S3_ACCESS_KEY === undefined ||
        params.AWS_S3_ACCESS_KEY === null ||
        params.AWS_S3_ACCESS_KEY === '' ||
        params.AWS_S3_SECRET === '' ||
        params.AWS_S3_SECRET === null ||
        params.AWS_S3_SECRET === undefined        
      ) {
        throw new Error('AWS Key can not be empty');
      }
      AWS.config.accessKeyId = params.AWS_S3_ACCESS_KEY;
      AWS.config.secretAccessKey = params.AWS_S3_SECRET;
      this._params = new AWS.S3();
    } else {
      this._params = params;
    }
      
  }

  save(file, type = 'base64') {

    return new Promise((resolve, reject) => {
      var date = new Date();
      var ms = date.getTime();
      if(this._local === 'aws') {
  
        let params = {
          Bucket: this._target,
          Key: `${ms}.${input.file.ext}`,
          Body: file,
          ACL: 'authenticated-read',
          ContentEncoding: type,
          ContentType: input.file.type
        };
  
        s3.upload(params, (err, data) => {
          if (err) {
            reject('Error on send file to AWS', err);
          } else {
            resolve(data.Location);
          }
        });
      } else if (this._local === 'local') {
        const folder = os.homedir() + '/uploads';
        const destine = `${folder}/${this._target}`;
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder);
        }
        if (!fs.existsSync(destine)) {
          fs.mkdirSync(destine);
        }
        fs.writeFile(`${destine}/${ms}.${input.file.ext}`, input.file.hash, {encoding: 'base64'}, (err) => {
          if (err) {
            reject('Error to write file on disk', err);
          } else {
            resolve(`${destine}/${ms}.${input.file.ext}`);
          }
        });
      }
    });
  
  };
  
  getLocal () {
    return this._local;
  };
  
  getTarget () {
    return this._target;
  }
  
  getParams () {
    return this._params;
  }
  
  setLocal (local) {
    this._local = local;
  }
  
  setTarget (target) {
    this.__target = target;
  }
  
  setParams (params) {
    this._params = params;
  }
}
