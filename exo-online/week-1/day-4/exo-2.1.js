/*
 * Entrainement 2.1
À partir de l'exercice 1.1 écrire la fonction (ou le programme) Vigenère qui prend en paramètre un mot clé et convertit un texte en sa version chiffrée
 * 
 */




function vigenere(txt,key,range){
	let MyVigenere 	=	"";	
	let decalage	=	0;
	let decalageOrd	=	0;
	let keyLength	=	key.length;
	let charsetLimiteRange = range;
	
	for(let i=0;i<txt.length;i++){			 
		decalage=key.charCodeAt(decalageOrd%keyLength)-(charsetLimiteRange[0]);
		if(txt[i]==" "){
			decalage=0
		}
		let valE=txt.charCodeAt(i)+decalage;
		
		if(valE >charsetLimiteRange[1]){
			valE=valE -(charsetLimiteRange[1]-charsetLimiteRange[0])-1;
		}
		MyVigenere=MyVigenere+String.fromCharCode(valE);
		if(txt[i] !=" "){
			decalageOrd++;
		}
		
	}
	return MyVigenere;
}
let message="VOICI UN MESSAGE";
let key="ABC";
let range =[65,90];
let crypted=vigenere(message,key,range);


console.log(message);
console.log(key);
console.log(crypted);