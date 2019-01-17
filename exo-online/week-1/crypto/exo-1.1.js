/*
 * Écrire une fonction qui chiffre un texte en paramètre étant donné une clé de décalage.
 * 
 */

function chiffreCesar(txt,decalage){
	let MyCesar ="";
	let charsetLimiteRange =[32,126];
	
	for(let i=0;i<txt.length;i++){
		let valE=txt.charCodeAt(i)+decalage;
		
		if(valE >charsetLimiteRange[1]){
			valE=valE -(charsetLimiteRange[1]-charsetLimiteRange[0])-1;
		}
		MyCesar=MyCesar+String.fromCharCode(valE);
	}
	return MyCesar;
}

let temp = chiffreCesar("abz}~AFc",2);
console.log(temp);