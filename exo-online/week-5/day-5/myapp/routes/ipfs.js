var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var path = require('path');
var fs = require('fs');
var bs58 = require('bs58');
var ethers = require('ethers');
 

/* GET add page ipfs. */
router.post('/add', function(req, res, next) {
	
	var form = new formidable.IncomingForm();
	form.parse(req);
    form.on('file', function (name, file){
    	 
    	let sFileUploaded = fs.readFileSync(file.path);
    	let sBuffer = Buffer.from(sFileUploaded);
    	global.node.add(sBuffer, (err, result) => {
    		if (err) {
    	          console.log(err);
    	          res.status(501).json(err);
    	    }else{
    	    	let data = result[0];
    	    	let unencodedData= data.hash;
    	    	const hashHex = "0x"+bs58.decode(unencodedData).slice(2).toString('hex');
				data.hashHex=hashHex;
    	    	  res.status(200).json(data);
    	    }    
    	});
         
    });

  
  
});

router.get('/getmypin', function(req, res, next) {
	var getMyPin = async function (req, res, next){
	const contractInstance = new ethers.Contract(global.gConfig.contractaddress,global.gConfig.abicontract,global.provider);
	 
	 
	let nbPin = await contractInstance.nbPin();
	
	let pins = [];
	 
	 for(let i = 0; i<nbPin ;i++){
		 let pinAddress = await contractInstance.pinAddress(i);
		 if(req.query.address.toLowerCase() == pinAddress.toLowerCase()){
			 let hash = await contractInstance.pin(i);
			 let duration = await contractInstance.pinDuration(i);
			 
			 let HashPin=global.decodeHash32(hash);
			 pins.push({hash:HashPin,duration:duration.toString()});
		 }
	 }
	 
	 //On génére la liste de pins
	 res.status(200).json(pins);
	  
	}
   getMyPin(req, res, next);
});



module.exports = router;
