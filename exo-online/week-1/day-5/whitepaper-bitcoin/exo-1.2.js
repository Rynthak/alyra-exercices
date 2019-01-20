/*
 * 
 * Exercice 1.2
Compléter la fonction de l’exercice précédent pour convertir un nombre en sa notation variable little endian

Reprendre le programme de conversion de l’exercice précédent pour donner la notation hexadécimale en entier variable d’un nombre donné
 * 
 */

/*Exercice 1.4.1.1
Écrire un programme qui convertisse un nombre décimal en sa version hexadécimal little endian et hexadécimal big endian 
sans avoir recours aux fonctions de conversion du langage utilisé

conversion(466321)
466321  → 0x 07 1d 91 (big endian)
	→ 0x 91 1d 07 (little endian)
	- 0x fe 91 1d 07 00  (notation variable)
*/

function conversion(value){
	let baseHexa= [ '0' ,'1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	let i=0;
	let unit = value;
	let temp = 0;
	let bigIndian="";
	let indian =[];
	
	while(unit){
		temp = (unit  % 16);		
		unit = ~~(unit/16);
		indian.push(baseHexa[temp]);		
	}	 
	if(indian.length%2!=0){
		indian.push(0);
	}
	let big ="0x"
	let little = "0x";
	let pair =[];
	let j= 0;
	for(i=indian.length-1;i>=0;i--){
		if(pair[j]==undefined){
			pair[j]=""
		}
		if(pair[j].length==2){
			j++;
			pair[j]="";
		}
		pair[j]=pair[j]+indian[i];
		
	}
	let tabVarInt=[];
	tabVarInt[2]="fd ";
	tabVarInt[3]=tabVarInt[4]=tabVarInt[5]=tabVarInt[6]=tabVarInt[7]="fe ";
	tabVarInt[8]="ff ";
	
	let prefixVarint="";
	if(value<253){
		prefixVarint="";
	}else if(pair.length>=8){
		prefixVarint=tabVarInt[8];
	}else{
		prefixVarint=tabVarInt[pair.length];
		if(value=>253 && pair.length==1){
			prefixVarint="fd ";
		}
	}
	let suffix = (pair.length%2 ==1)?" 00":"";
	
	console.log("0x " + pair.join(" ")+" - (big endian)");
	console.log("0x " + pair.reverse().join(" ")+" - (little endian)");
	console.log("0x " + prefixVarint+pair.reverse().join(" ")+suffix +" - (notation variable)");
	
	
}

conversion(300);