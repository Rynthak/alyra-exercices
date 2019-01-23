/*Exercice 1.2
Ecrire une fonction qui étant donné le champ Bits d’un bloc en déduit la difficulté*/
/* Bites cf https://bitcoin.stackexchange.com/questions/2924/how-to-calculate-new-bits-value */

function calculerDifficulte(HexValue){
	let max = 2.7 * Math.pow(10,67)	;	 	
	console.log(max/parseInt(HexValue.substring(4,HexValue.length)+("00".repeat(parseInt(HexValue.substring(2,4),16)-3)),16));
}
calculerDifficulte('0x1c0ae493');