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
		let header=blockHex.substring(0,159);
		let block=blockHex.substring(160);
		
		
		
		//$("#header").html(header);
		
		
		let textHeader="Header<br>";
		textHeader+=header+'<br>';
		let version = LittleEndianToHex(header.substring(0,7));
		 
		
		textHeader+='Version='+HexToDecimal(version)+'<br>';
		
		textHeader+='previous block header hash='+(LittleEndianToHex(header.substring(8,72),''))+'<br>';
		textHeader+='merkle root hash='+LittleEndianToHex(header.substring(72,136),'')+'<br>';
		textHeader+='time='+HexToDecimal(LittleEndianToHex(header.substring(136,144)))+'<br>';
		textHeader+='time='+timeConverter(HexToDecimal(LittleEndianToHex(header.substring(136,144))))+'<br>';
		
		textHeader+='nBits='+BitsFieldToTarget((LittleEndianToHex(header.substring(144,151))))+'<br>';
		 //console.log(LittleEndianToHex(header.substring(144,151)));
		textHeader+='nonce='+HexToDecimal((header.substring(151,159)))+'<br>';
		 
		$("#header").html(textHeader);
		
		
		//Block Body
		
		let textBody="Body<br>";
		textBody+=block+'<br>';
		
		//Calcul du nombre de transaction
		$("#body").html(textBody);
		
	});

});

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
	//console.log(varIntVal,varint,varint.substring(2,6));return;
	switch(varIntVal){
		case "fd":
			
			valTemp=HexToDecimal(LittleEndianToHex(varint.substring(2,6)))
			
		break;
		
		case "fe":
			valTemp=HexToDecimal(LittleEndianToHex(varint.substring(2,10)))
		break;
		
		case "ff":
			valTemp=HexToDecimal(LittleEndianToHex(varint.substring(2,18)))
		break;
		
		default:
			valTemp=HexToDecimal(LittleEndianToHex(varint))
		break;
		
		
	}
	
	return valTemp;
	
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