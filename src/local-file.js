import os from 'os';
import fs from 'fs';

export const saveFileLocal = (object) => {
  var date = new Date();
  var ms = date.getTime();
  var file = object.file.split(';base64,');
  var typeFile = file[0].split(';')[0];
  typeFile = typeFile.replace('data:', '');
  var ext = typeFile.split('/')[1];
  file = file[1];

  const folder = object._params ? object._params : os.homedir() + '/uploads';
  const destine = `${folder}/${object._target}`;
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  if (!fs.existsSync(destine)) {
    fs.mkdirSync(destine);
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(`${destine}/${ms}.${ext}`, file, {encoding: object.type}, err => {
      if (err) {
        reject({
          type: 'error',
          message: `Error to write file on disk, ${err}`
        });
      } else {
        resolve({
          type: 'done',
          message: `${destine}/${ms}.${ext}`
        });
      }
    });
  })
}