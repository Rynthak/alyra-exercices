/*
 * Exercice 1.2
	Ecrire une fonction qui prend en entrée un texte et retourne le nombre d'occurrences de chaque caractère dans le texte
 * 
 */
function frequences(text){
	let temp=[];
	let result="";
	for(let i=0;i<text.length;i++){
		if(temp[text.charAt(i)]==undefined){
			temp[text.charAt(i)]=0;
		}
		temp[text.charAt(i)]=temp[text.charAt(i)]+1;
	}
	
	for(let index in temp){
		result=result+temp[index]+index+" ";
	}
	return result;
}
let resultF=frequences("Etre contesté, c’est être constaté");
console.log(resultF);