//Création d'une classse objet Block
function Block(raw_hex){
	
	this.raw_hex=raw_hex;
	
	this.header=new BlockHeader(this.raw_hex.substring(0,159));
	this.body=this.raw_hex.substring(160);
	
	
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