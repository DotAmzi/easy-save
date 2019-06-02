
# Easy Save

![](https://img.shields.io/badge/NodeJS-4.0.0-green.svg)
![](https://img.shields.io/badge/license-MIT-green.svg)
![](https://travis-ci.org/DotAmzi/easy-save.svg?branch=master)

Easy Save is a wrapper for saving files to local disk or AWS S3
**Currently receives only base64 file**

## Installation Instructions

```bash
npm install --save easy-save
```

## How to Use

 1. First import the easy save

```bash
import EasySave from 'easy-save';
```

2. Construct Object

```bash
const newConnect  =  new  EasySave({
		AWS_S3_ACCESS_KEY:  'any',
		AWS_S3_SECRET:  'any'
	}, 'aws', {
		bucket:  'BucketExample',
		folder:  'Folder'
	});
```

3. Send File

```bash
newConnect.save(base64pic)
	.then(res  => {
		console.log('Save with Success');
	})
	.catch (err  => {
		console.log('Error on save file');
	})
```

## Params on construct

```bash
const newConnect  =  new  EasySave(
	params, 
	local,
	target
);
```
**params**
```bash
// if you choose AWS 
{
	AWS_S3_ACCESS_KEY:  'Access Key from Amazon',
	AWS_S3_SECRET:  'Secret from Amazon'
}
```

  
If you choose save file to disk, declare the full disk path, example: `/var/www`

**local**

Choose two options: `aws` or `local`

**target**

```bash
// if you choose AWS 
{
	bucket:  'BucketExample',
	folder:  'Folder'
}
```

If you choose to save file to disk, declare a folder to save the file. In case folder does not exist the Easy Save creates. Example: `folderExample`

## Methods

**Save**

Method to save file on aws or disc.
```bash
newConnect.save(base64pic, type)
```
 
 - **Base64pic** - Receive base 64 string
 - **type** - Type file,  temporarily receives only base64

Return promises with result.

**Get Method**

Methods that return previously declared values

```bash
newConnect.getType()
newConnect.getTarget()
newConnect.getParams()
```

Return value that has already been declared

**Set Method**

Methods that edit the value already declared

```bash
newConnect.setType('New Value');
newConnect.setTarget('New Value');
newConnect.setParams('New Value');
```
Does not return value

## Questions
https://github.com/DotAmzi/easy-save/issues