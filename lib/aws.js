
import AWSmock from 'mock-aws-s3';
import AWS from 'aws-sdk';

export const constructObjectAWS = (params, object) => {
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
    return new AWSmock.S3({
      params: { Bucket: object._target.bucket }
    });
  }else{
    return new AWS.S3();
  }
}

export const saveFileAWS = (object) => {
  var file = object.file.split(';base64,');
  var typeFile = file[0].split(';')[0];
  typeFile = typeFile.replace('data:', '');
  var ext = typeFile.split('/')[1];
  file = file[1];

  var date = new Date();
  var ms = date.getTime();
  return {
    Bucket: `${object._target.bucket}/${object._target.folder}`,
    Key: `${ms}.${ext}`,
    Body: file,
    ACL: 'authenticated-read',
    ContentEncoding: typeFile,
    ContentType: typeFile
  };
}