/*
 * Exercice 2.2
 * Ecrire un programme qui prend en paramètre une date et retourne la récompense actuelle et le nombre total de bitcoins en circulation à cette date.

Combien il y aura-t-il de Bitcoins en circulation au maximum en 2100?
 * 
 */
function getDateDiff(date1,date2){
	 
	var difference = (date1 - date2) / 1000;
	return difference;
}


function calculateNbBitcoinsByDate(date) {
	
	//Calcul de la hauteur à une date donné
	// datecreeationBitcoin https://bitcoin.fr/histoire/ 
	let datecreeationBitcoin = new Date('2009-01-03');
	//La hauteur du bloc = Nombre de seconde écoulé entre Date decréation  et la date demandé divisé par 10 minutes , car un bloc est crée toutes les 10 minutes
	let height=~~(getDateDiff(date,datecreeationBitcoin)/(10*60));
	
	console.log(height);
	
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

calculateNbBitcoinsByDate(new Date('2100-01-01'));
