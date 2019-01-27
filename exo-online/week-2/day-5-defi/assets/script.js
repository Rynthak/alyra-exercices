$(function() {

	$("#convert_button").click(function() {
		let type_convert = $("#type_convert").val();
		let value_to_convert = $("#value_to_convert").val();
		let val="";
		switch (type_convert) {

		case "1":
			val=HexToDecimal(value_to_convert);
			break;
		case "2":
			val="0x"+DecimalToHex(value_to_convert).toUpperCase();
			break;
		case "3":
			val="0x"+LittleEndianToHex(value_to_convert,'').toUpperCase();
			break;
		case "4":
			val=VarIntToDecimal(value_to_convert).nbO;
			break;
		case "5":
			val=BitsFieldToTarget(value_to_convert);
			break;
		case "6":
			val=TargetToDifficulty(value_to_convert);
			break;
		case "7":
			val=ScriptHexaToOpcode(value_to_convert);
			break;

		}
		$("#result-div").removeClass('d-none');
		$("#result").html(val);

	});
	
	$("#block_hex_file").change(function(e){
		var file = e.target.files[0];
		  if (!file) {
		    return;
		  }
		  var reader = new FileReader();
		  reader.onload = function(e) {
		    var contents = e.target.result;	     
		    $("#block_hex").val(contents);
		  };
		  reader.readAsText(file);
	})

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
		
		 
		
		textBody+='<hr>'
		//Calcul du nombre de transaction
		$("#body").html(textBody); 
		
	});

});
 

function HexToDecimal(value) {
	return (parseInt(value, 16));
}
function DecimalToHex(value) {
	return parseInt(value).toString(16) ;
	 
}
function LittleEndianToHex(endian,prefix="0x"){
	return prefix+endian.match(/../g).reverse().join('');
		
}
function VarIntToDecimal(value){
	let prefix=value.substring(0,2)
	let varint=value;
	if(prefix=="0x"){
		varint=varint.substring(2);
	}
	let varIntVal=varint.substring(0,2);
	let valTemp="";
	let sizeVarint=2;
	
	
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
	return bytesToAsm(hexStringToBytes(HexValue)).join(' ');
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