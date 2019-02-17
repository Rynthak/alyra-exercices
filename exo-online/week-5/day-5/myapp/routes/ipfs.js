var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var path = require('path');
var ethers = require('ethers');
var ipfsAPI = require('ipfs-api');

var fs = require('fs');
var provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
var ipfs = ipfsAPI('localhost', '5001');
var bs58 = require('bs58');



/* GET add page ipfs. */
router.post('/add', function(req, res, next) {
	
	var form = new formidable.IncomingForm();
	form.parse(req);
    form.on('file', function (name, file){
    	 
    	let sFileUploaded = fs.readFileSync(file.path);
    	let sBuffer = Buffer.from(sFileUploaded);
    	ipfs.files.add(sBuffer, (err, result) => {
    		if (err) {
    	          console.log(err);
    	          res.status(501).json(err);
    	    }else{
    	    	let data = result[0];
    	    	let unencodedData= data.hash;
    	    	//console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);
				const hashHex = "0x"+bs58.decode(unencodedData).slice(2).toString('hex');
				data.hashHex=hashHex;
    	    	  res.status(200).json(data);
    	    }    
    	});
         
    });

  
  
});

module.exports = router;
