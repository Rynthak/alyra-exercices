//Création d'une classse objet Block
function Block(raw_hex){	
	this.raw_hex=raw_hex;	
	this.header=new BlockHeader(this.raw_hex.substring(0,160));
	this.body=new BlockBody(this.raw_hex.substring(160));
	return this;	
}
function BlockHeader(raw_hexHeader){
	this.raw_hex=raw_hexHeader;	
	//Parsing de la version du block
	this.version=(LittleEndianToHex(this.raw_hex.substring(0,8)));
	this.previousBlockHash=LittleEndianToHex(this.raw_hex.substring(8,72),'');
	this.merkle_root=LittleEndianToHex(this.raw_hex.substring(72,136),'');
	this.time=timeConverter(HexToDecimal(LittleEndianToHex(this.raw_hex.substring(136,144))));
	 
	this.nBits=LittleEndianToHex(this.raw_hex.substring(144,152));
	this.difficulty=TargetToDifficulty(BitsFieldToTarget(this.nBits));
	this.nonce=HexToDecimal(LittleEndianToHex(this.raw_hex.substring(152,160)));
	return this;	
}
function BlockBody(raw_hexBody){
	this.raw_hex=raw_hexBody;	
	
	let varIntTemp=VarIntToDecimal(this.raw_hex);	
	this.nb_transac=varIntTemp.nbO;
	this.offsetVarint=varIntTemp.lengthVarint;
	//On récupère les transac
	this.transacTab= [];
	this.raw_hex=this.raw_hex.substring(this.offsetVarint);
	try{
		for(let i=0;i<this.nb_transac;i++){
			
			let oTransac=new Transaction(this.raw_hex);		 
			this.transacTab.push(oTransac);
			 
			this.raw_hex=this.raw_hex.substring(oTransac.size);
			//break;
			 
		}
	}catch(e){
		console.log(e);
	}
	return this;
		
	
}
function Transaction(raw_hex,singleTransaction=false){
	this.sizeBytes=0;
	this.raw_hex=raw_hex;
	this.coinbase=false;
	this.txid="To Calc";	
	
	if(singleTransaction==true){
		this.txid=CryptoJS.SHA256(CryptoJS.SHA256(this.raw_hex).toString()).toString();	
		 
	}
	
	//Récupération du numéro de version
	this.version=HexToDecimal(LittleEndianToHex(this.raw_hex.substring(0,8)));
	 
	this.raw_hex=this.raw_hex.substring(8);
	this.sizeBytes+=8
	//Double hash 256 on raw ex @todo
	 
	//test if segwit
	if(this.raw_hex.substring(0,4)=="0001"){		 
		this.raw_hex=this.raw_hex.substring(4);
		this.sizeBytes+=4;
		this.segwit=true;
	}
	let tempVarint=VarIntToDecimal(this.raw_hex)
	this.nbInputs=tempVarint.nbO;	 
	this.raw_hex=this.raw_hex.substring(tempVarint.lengthVarint); 
	this.sizeBytes+=tempVarint.lengthVarint;
	 
	
	this.inputs = [];
	//Récupérations des inputs
	for(let i =0 ; i< this.nbInputs;i++){
		let tempInput= {};		 
		let oOutPoint=new OutPoint(this.raw_hex);	
		if(oOutPoint.coinbase==true){
			this.coinbase=true;
		}
		tempInput.outpoint=oOutPoint;
		this.raw_hex=this.raw_hex.substring(oOutPoint.size);
		this.sizeBytes+=oOutPoint.size;
		this.inputs.push(tempInput);
	}
	 
	//On passe aux output
	 
	let tempVarintOutpout=VarIntToDecimal(this.raw_hex)
	this.nbOutputs=tempVarintOutpout.nbO;
	this.raw_hex=this.raw_hex.substring(tempVarintOutpout.lengthVarint);
	this.sizeBytes+=tempVarintOutpout.lengthVarint;
	this.outputs=[];
	
	for(let i =0 ; i< this.nbOutputs;i++){
		let tempOutPut= {};
		//
		let oOutPut=new OutPut(this.raw_hex);		
		tempOutPut.output=oOutPut;
		this.raw_hex=this.raw_hex.substring(oOutPut.size);
		this.sizeBytes+=oOutPut.size;
		this.outputs.push(tempOutPut);
		
	}
	 
	this.locktime=(HexToDecimal(LittleEndianToHex(this.raw_hex.substring(0,8))));
	this.raw_hex=this.raw_hex.substring(8);
	this.sizeBytes+=8;
	this.segWithSequence="";
	if(this.segwit==true){
		
		this.witness=new Segwit(this.raw_hex,this.inputs.length)
	}
	
	this.size=this.sizeBytes;
	this.sizeBytes=this.size/2;
	 
}
function Segwit(raw_hex,input_length){
	//Gestion du Segwit - Witness
	this.raw_hex=raw_hex;
	this.input_length=input_length;
	this.segwit_value=""
	this.sizeBytes=0;
	
	for(let i=0;i<this.input_length;i++){
		
		 //Récupération du premier varint pour l'input i	
		 let tempVarIntField=VarIntToDecimal(this.raw_hex);
		 this.sizeBytes+=tempVarIntField.lengthVarint;
		 let valueSegwitVarint=VarIntToDecimal(this.raw_hex);
		 
		 this.sizeBytes+=valueSegwitVarint.lengthVarint;
		 this.segwit_value+=this.raw_hex.substring(0,valueSegwitVarint.lengthVarint);
		 this.raw_hex=this.raw_hex.substring(valueSegwitVarint.lengthVarint);
		 if(valueSegwitVarint.nb0==0)continue;
		
		 for(let j = 0 ;j<valueSegwitVarint.nb0;j++){
			 //
			 let tempVarIntFieldSecond=VarIntToDecimal(this.raw_hex); 
			 this.sizeBytes+=tempVarIntFieldSecond.lengthVarint;
			 this.segwit_value+=this.raw_hex.substring(0,tempVarIntFieldSecond.lengthVarint);
			 this.raw_hex=this.raw_hex.substring(tempVarIntFieldSecond.lengthVarint);
			 
			 this.segwit_value+=this.raw_hex.substring(0,tempVarIntFieldSecond.lengthVarint);
			 
		 }
	}
}


function OutPoint(raw_hex){
	this.size=72;
	this.raw_hex=raw_hex;
	this.coinbase=false;
	this.hash = raw_hex.substring(0,64);
	this.index = raw_hex.substring(64,72);
	
	if(this.hash =='0'.repeat(64)){//pinut non coin base
		this.coinbase=true;		
	} 	
	let script_bytesTemp=VarIntToDecimal(this.raw_hex.substring(72));
		
	this.ScriptSigSize=script_bytesTemp.nbO;	
	this.size+=script_bytesTemp.lengthVarint;
	
	let tempScriptlImitPosition=72+script_bytesTemp.lengthVarint+(this.ScriptSigSize*2);
	this.ScriptSig=this.raw_hex.substring(72+script_bytesTemp.lengthVarint,tempScriptlImitPosition);	
	this.size+=this.ScriptSigSize*2;	
	
	
	
	this.sequence=(HexToDecimal(LittleEndianToHex(this.raw_hex.substring(tempScriptlImitPosition,tempScriptlImitPosition+8))));	
	this.size+=8
	
	return this;
}

function OutPut(raw_hex){
	this.size=0;
	this.raw_hex=raw_hex;	 
	
	//Nombre de satochi.
	this.value=HexToDecimal(LittleEndianToHex(this.raw_hex.substring(0,16)));
	this.value=this.value/Math.pow(10,8);
	this.size+=16;
	
	//Extraction du Pk script;
	this.raw_hex=this.raw_hex.substring(16);
	  
	let pk_scriptBytesTemp=VarIntToDecimal(this.raw_hex);
	 
	this.pk_scriptBytes=pk_scriptBytesTemp.nbO;	
	this.size+=pk_scriptBytesTemp.lengthVarint;
	this.size+=this.pk_scriptBytes*2;
	
	this.raw_hex=this.raw_hex.substring(pk_scriptBytesTemp.lengthVarint);
	//Récupération du pk script
	
	this.pk_script=new Script(this.raw_hex.substring(0,this.pk_scriptBytes*2));
	
	
	
	
	return this;
}

function Script(raw_hex){
	this.raw_hex=raw_hex;
	this.asm=ScriptHexaToOpcode(this.raw_hex)
	
}
 