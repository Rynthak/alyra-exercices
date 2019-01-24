/*
 * Exercice 2.0
Ecrire une fonction qui, étant donné une hauteur de bloc, calcule la récompense associée à ce bloc. 
 * 
 * 
 * */

function calculateRewards(height){
	//Il faut diviser la récompense initiale de 50 par le nombre de fois où moins bloc à dépasser les 210 000 blocs
	let initBlocRewards=50;
	let stepDivide=210000;
	let rewards =  Math.floor(initBlocRewards / Math.pow(2,~~(height/stepDivide)));
	
	console.log(rewards);
}
calculateRewards(420000);
