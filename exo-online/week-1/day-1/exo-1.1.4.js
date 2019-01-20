/*Exercice 1.1.4
Construire une classe cercle: 

Son constructeur prend en paramètre un rayon
Ses méthodes aire() et périmetre() retournent les valeurs correspondantes.*/


function cercle(rayon){
	this.rayon=rayon
	
	this.perimetre = function(){
		return rayon *2 * Math.PI;
	}
	
	this.aire = function(){
		return Math.pow(rayon ,2) * Math.PI;
	}
}
 let MyCircle = new cercle(5);
 
 console.log("périmetre = "+ MyCircle.perimetre() );
 console.log("aire = "+ MyCircle.aire() );