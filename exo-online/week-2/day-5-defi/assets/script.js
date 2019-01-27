$(function() {

	$("#convert_button").click(function() {
		let type_convert = $("#type_convert").val();
		let value_to_convert = $("#value_to_convert").val();
		switch (type_convert) {

		case "1":
			HexToDecimal(value_to_convert);
			break;
		case "2":
			DecimalToHex(value_to_convert);
			break;
		case "3":
			LittleEndianToHex(value_to_convert);
			break;
		case "4":
			VarIntToDecimal(value_to_convert);
			break;
		case "5":
			BitsFieldToTarget(value_to_convert);
			break;
		case "6":
			TargetToDifficulty(value_to_convert);
			break;
		case "7":
			ScriptHexaToOpcode(value_to_convert);
			break;

		}

	});
	

	$("#convert_block_button").click(function(e) {
		let blockHex=$("#block_hex").val();
		let oBlock= new Block(blockHex)
			
		//Parse Block Header
		let textHeader="Header<br>";
		textHeader+="Header Hex Format :"+oBlock.header.raw_hex+'<br>';		
		textHeader+='Version='+oBlock.header.version+'<br>';		
		textHeader+='Previous block header hash='+oBlock.header.previousBlockHash+'<br>';
		textHeader+='Merkle root hash='+oBlock.header.merkle_root+'<br>';		
		textHeader+='Time='+oBlock.header.time+'<br>';		
		textHeader+='nBits='+oBlock.header.nBits+'<br>';		 
		textHeader+='Nonce='+oBlock.header.nonce+'<br>';	
		textHeader+='<hr>'
		$("#header").html(textHeader);		
		
		//Parse Block Body
		
		 
		let textBody="Body<br>";
		textBody+="Body Raw Hex="+oBlock.body.raw_hex+'<br>';
		textBody+='nbTransac='+oBlock.body.nb_transac+'<br>';
		
		//On enlève le varInt du body
		
		/*
		console.log(block);
		//Decoupage des transaction
		for(let i=0;i<nbTransac;i++){
			textBody+='Transac #='+(i+1)+'<br>';
			block=block.substring(offsetVarint);
			parseTransaction(block,offsetVarint,textBody);
			textBody+="<hr>";
		}*/
		
		textBody+='<hr>'
		//Calcul du nombre de transaction
		$("#body").html(textBody); 
		
	});

});
//Parse Transac Hex
function parseTransaction(block,offsetVarint){
	
}

function HexToDecimal(value) {
	return (parseInt(value, 16));
}
function DecimalToHex(value) {
	let convert = parseInt(value).toString(16) ;
	alert(convert);
}
function LittleEndianToHex(endian,prefix="0x"){
	var r = prefix+endian.match(/../g).reverse().join('');
	return r;	
}
function VarIntToDecimal(value){
	let prefix=value.substring(0,2)
	let varint=value;
	if(prefix=="0x"){
		varint=varint.substring(2);
	}
	let varIntVal=varint.substring(0,2);
	let valTemp="";
	let sizeVarint=4;
	
	
	switch(varIntVal){
		case "fd":
			valTemp=HexToDecimal(LittleEndianToHex(varint.substring(2,6)))
			sizeVarint=6;
		break;
		
		case "fe":
			valTemp=HexToDecimal(LittleEndianToHex(varint.substring(2,10)))
			sizeVarint=10;
		break;
		
		case "ff":
			valTemp=HexToDecimal(LittleEndianToHex(varint.substring(2,18)))
			sizeVarint=18;
		break;
		
		default:
			valTemp=HexToDecimal(LittleEndianToHex(varint.substring(0,2)))
		break;
		
	}
	return {'lengthVarint':sizeVarint,'nbO':valTemp};
}

function BitsFieldToTarget(BitsFields){
	return parseInt(BitsFields.substring(4,BitsFields.length)+("00".repeat(parseInt(BitsFields.substring(2,4),16)-3)),16);
	 
}
function TargetToDifficulty(Target){
	let max = 2.7 * Math.pow(10,67)	;	 	
	let difficulty=max/Target;
	alert(difficulty);
}


function ScriptHexaToOpcode(HexValue){
	
}

function printResult(value, text) {

}
function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	  return time;
	}