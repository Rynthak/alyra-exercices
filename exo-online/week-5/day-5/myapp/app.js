var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const _ = require('lodash');
var ethers = require('ethers');
var ipfsAPI = require('ipfs-api');
const Ipfs= require('ipfs');


const config = require('./config/config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;

var indexRouter = require('./routes/index');
var ipfsRouter = require('./routes/ipfs');
var bs58 = require('bs58');
var provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
global.node = node = new Ipfs()
var app = express();


node.on('ready', () => {
	 console.log("IPFS prêt")
	
	 provider.getNetwork().then( (r) =>{  console.log("Ethereum connecté sur ", r)
			 
		//On écoute l'evenement Epingler
			 
		 const contractInstance = new ethers.Contract(finalConfig.contractaddress,finalConfig.abicontract,provider)
		 contractInstance.on('Epingler', ( pin,duration, event) =>{
			 //ON PIN LE HASH DE L'EVENT
			 console.log(pin,duration.toString());
			 
			 //Il faut decoder le pin
			 
			 const hashHex = "1220" + pin.slice(2)
			 const hashBytes = Buffer.from(hashHex, 'hex');
			 const HashToPIn = bs58.encode(hashBytes);
			 
			 node.pin.add(HashToPIn, (err, result) => {
				 if (err) {
					 console.er('Error pin', err);
					 return false;
				 }
				 console.log(result[0].hash +' was pinned');
				 
			 });
			 
	     });
	 
	 	
	 });
})



 
app.use(function locals(req, res, next){
    res.locals.abicontract = finalConfig.abicontract;
    res.locals.contractaddress = finalConfig.contractaddress;
    res.locals.node = node;
    next();
  });
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ipfs', ipfsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
