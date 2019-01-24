/*
 * Exercice 2.1
Ecrire une fonction qui, étant donné une hauteur de bloc, calcule le nombre total de bitcoins en circulation lors de la publication de ce bloc. 
Le graphique ci-dessus peut vous aider;
 * 
 * 
 * */

function calculateNbBitcoins(height) {

	let initBlocRewards = 50;
	let stepDivide = 210000;
	let numberDecrease = ~~(height / stepDivide);
	let NbBitcoins = 0;

	for (let i = 0; i < numberDecrease; i++) {
		NbBitcoins += (initBlocRewards / Math.pow(2, i)) * stepDivide;
		
	}
	
	// Il faut ajouter le reste de période si je suis en plein milieu d'un bloc donc le rewards n'a pas été divisé par deux
	 
	NbBitcoins += (initBlocRewards / Math.pow(2, numberDecrease)) * (height % stepDivide);
	console.log(NbBitcoins);

}

calculateNbBitcoins(422208)