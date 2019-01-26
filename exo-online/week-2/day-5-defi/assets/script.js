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
	

	

});

function HexToDecimal(value) {
	alert(parseInt(value, 16));
}
function DecimalToHex(value) {
	let convert = parseInt(value).toString(16) ;
	alert(convert);
}
function LittleEndianToHex(endian){
	var r = '0x'+endian.match(/../g).reverse().join('');
	alert(r);		
}
function VarIntToDecimal(value){
	
}
function BitsFieldToTarget(BitsFields){
	parseInt(BitsFields.substring(4,BitsFields.length)+("00".repeat(parseInt(BitsFields.substring(2,4),16)-3)),16);
	alert(BitsFields);
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