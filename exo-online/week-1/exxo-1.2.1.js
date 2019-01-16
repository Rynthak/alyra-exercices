/*
 * Exercice 1.2.1

On souhaite calculer factoriel d'un nombre a. Factoriel s'exprime comme le produit des entiers jusqu'à a inclus : a! = 1 x 2 x 3 ... x a

Définir un programme pour calculer la factorielle d'un nombre a . Quel est le nombre d'opérations à effectuer?
 * 
 * 
 */


let valueToCalc = prompt("Entrez une valeur");

if(valueToCalc==0){
	"";
}

function calfactoriel(value){
	if(value<=1){
		return value
	}
	return value*calfactoriel(value-1);
}

//Calcul du factoriel de la valeur rentré
let myFactoriel=calfactoriel(valueToCalc);

document.write("Factoriel de "+valueToCalc+" = "+myFactoriel);

/*
 * Le nombre d'opérations (multiplication) à effectuer sera la cardinalité 
 * du sous ensemble fini des entiers de 1 à N avec N la valeur du factoriel à chercher
 */