/*Exercice 1.4.1.1
Écrire un programme qui convertisse un nombre décimal en sa version hexadécimal little endian et hexadécimal big endian 
sans avoir recours aux fonctions de conversion du langage utilisé

conversion(466321)
466321  → 0x 07 1d 91 (big endian)
	→ 0x 91 1d 07 (little endian)
*/

function conversion(value){
	let baseHexa= [ '0' ,'1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	let i=0;
	let unit = value;
	let temp = 0;
	let bigIndian="";
	let indian =[];
	
	while( unit>0){
		temp = (unit  % 16);
		
		unit = ~~(unit/16);
		indian.push(baseHexa[temp]);
		
	}
	if(unit<=1){
		indian.push(baseHexa[unit]);
	}
	let big ="0x"
	let little = "0x";
	let couple =[];
	let j= 0;
	for(i=indian.length-1;i>=0;i--){
		if(couple[j]==undefined){
			couple[j]=""
		}
		if(couple[j].length==2){
			j++;
			couple[j]="";
		}
		couple[j]=couple[j]+indian[i];
		
	}
	console.log("0x " + couple.join(" ")+" - (big endian)");
	console.log("0x " + couple.reverse().join(" ")+" - (little endian)");
}

conversion(466321);