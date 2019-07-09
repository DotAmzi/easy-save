import isBase64 from 'is-base64';

import {constructObjectAWS, saveFileAWS} from './aws.js'
import {saveFileLocal} from './local-file.js';

var instance = {};

class EasySave {
  constructor(params, local = 'aws', target = '') {
    if(params === undefined) {
      throw new Error('First parameter is required');
    }
    this._type = local;
    this._target = target;

    if (this._type === 'aws') {
      this._params = constructObjectAWS(params, this);
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
        if(this._type === 'aws') {          
          let params = saveFileAWS(this);
          this._params.upload(params, (err, data) => {
            if (err) {
              reject('Error on send file to AWS', err);
            } else {
              resolve(data.Location);
            }
          });
        } else if (this._type === 'local') {
          saveFileLocal(this)
          .then(returnData => {
            if (returnData.type === 'error') {
              reject(returnData.message);
            } else {
              resolve(returnData.message);
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

export default EasySave;