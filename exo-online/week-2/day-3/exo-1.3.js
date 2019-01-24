/*
 * 
 * 
Exercice 1.3
Ecrire une fonction qui détermine s’il s’agit d’un bloc pendant lequel la difficulté est réajustée ou non.

blocReajustement(556416) -> true

 * 
 */

function blocReajustement(value){
	
	return value%2016==0;
}
let reajust=blocReajustement(556416);
console.log(reajust);
