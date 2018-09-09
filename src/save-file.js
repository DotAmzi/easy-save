import os from 'os';
import fs from 'fs';
import AWSmock from 'mock-aws-s3';
import AWS from 'aws-sdk';
import isBase64 from 'is-base64';

var instance = {};

export default class EasySave {
  constructor(params, local = 'aws', target = '') {
    if(params === undefined) {
      throw new Error('First parameter is required');
    }
    this._type = local;
    this._target = target;

    if (this._type === 'aws') {
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
      if(process.env.NODE_ENV === 'test') {
        this._params = new AWSmock.S3({
          params: { Bucket: this._target.bucket }
        });
      }else{
        this._params = new AWS.S3();
      }
    } else {
      this._params = params;
    }
      
  }

  save(file, type = 'base64') {
    this.file = file;
    this.type = type;
    return new Promise((resolve, reject) => {
      if( this.file === undefined ) {
        reject('File input required');
      } else if(!isBase64(this.file)){
        reject('String not is Base64');
      } else {
        var file = this.file.split(';base64,');
        var typeFile = file[0].split(';')[0];
        typeFile = typeFile.replace('data:', '');
        var ext = typeFile.split('/')[1];
        file = file[1];
  
        var date = new Date();
        var ms = date.getTime();
        if(this. _type === 'aws') {
          let params = {
            Bucket: `${this._target.bucket}/${this._target.folder}`,
            Key: `${ms}.${ext}`,
            Body: file,
            ACL: 'authenticated-read',
            ContentEncoding: typeFile,
            ContentType: typeFile
          };
          
          this._params.upload(params, (err, data) => {
            if (err) {
              reject('Error on send file to AWS', err);
            } else {
              resolve(data.Location);
            }
          });
        } else if (this. _type === 'local') {
          const folder = this._params ? this._params : os.homedir() + '/uploads';
          const destine = `${folder}/${this._target}`;
          if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
          }
          if (!fs.existsSync(destine)) {
            fs.mkdirSync(destine);
          }
          fs.writeFile(`${destine}/${ms}.${input.file.ext}`, input.file.hash, {encoding: type}, err => {
            if (err) {
              reject('Error to write file on disk', err);
            } else {
              resolve(`${destine}/${ms}.${input.file.ext}`);
            }
          });
        } 
      }
    });
  
  };
  
  getType () {
    return this._type;
  };
  
  getTarget () {
    return this._target;
  }
  
  getParams () {
    return this._params;
  }
  
  setType (local) {
    this._type = local;
  }
  
  setTarget (target) {
    this.__target = target;
  }
  
  setParams (params) {
    this._params = params;
  }
}
