//Création d'une classse objet Block
function Block(raw_hex){	
	this.raw_hex=raw_hex;	
	this.header=new BlockHeader(this.raw_hex.substring(0,159));
	this.body=new BlockBody(this.raw_hex.substring(160));
	return this;	
}
function BlockHeader(raw_hexHeader){
	this.raw_hex=raw_hexHeader;	
	//Parsing de la version du block
	this.version=HexToDecimal(LittleEndianToHex(this.raw_hex.substring(0,7)));
	this.previousBlockHash=LittleEndianToHex(this.raw_hex.substring(8,72),'');
	this.merkle_root=LittleEndianToHex(this.raw_hex.substring(72,136),'');
	this.time=timeConverter(HexToDecimal(LittleEndianToHex(this.raw_hex.substring(136,144))));
	this.nBits=BitsFieldToTarget((LittleEndianToHex(this.raw_hex.substring(144,151))))
	this.nonce=HexToDecimal((this.raw_hex.substring(151,159)))
	return this;	
}
function BlockBody(raw_hexBody){
	this.raw_hex=raw_hexBody;	
	
	let varIntTemp=VarIntToDecimal(this.raw_hex);	
	this.nb_transac=varIntTemp.nbO;
	this.offsetVarint=varIntTemp.lengthVarint;
	//On récupère les transac
	this.transacTab= [];
	for(let i=0;i<this.nb_transac;i++){
		let temp=this.raw_hex.substring(this.offsetVarint);
		let oTransac=new Transaction(temp);
		console.log(oTransac);
		this.transacTab.push(oTransac);
		break;
	}
	
	
}
function Transaction(raw_hex){
	this.sizeBytes=0;
	this.raw_hex=raw_hex;
	
	//Récupération du numéro de version
	this.version=HexToDecimal(LittleEndianToHex(this.raw_hex.substring(0,7)));
	this.raw_hex=this.raw_hex.substring(8);
	
	//Récupération du nombre d'inputs
	
	let tempVarint=VarIntToDecimal(this.raw_hex)
	this.nbInputs=tempVarint.nbO;
	
	//Récupérations des inputs
	
}