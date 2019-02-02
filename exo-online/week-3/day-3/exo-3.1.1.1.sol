/* 
 * Exercice 3.1.1.1 Passer à l’artiste suivant

Modifier la fonction passer ArtisteSuivant() pour qu’elle ne fasse rien après le dernier passage.

Modifier la fonction la fonction artisteEnCours() pour qu’elle retourne le nom de l’artiste en cours s’il y en a un, et “FIN” sinon.

Aide: Le nombre d’artistes inscrits se calcule à partir du maximum et des places libres

 
 * 
 * 
 * */
pragma solidity ^0.4.25;
contract SceneOuverte {
	
	string[12] passagesArtistes;
	uint creneauxLibres = 12;
	uint tour;
	 
	
	function sInscrire(string nomDArtiste) public{
		if(creneauxLibres >0){
			passagesArtistes[12-creneauxLibres]=nomDArtiste;
			creneauxLibres--;		 
		}
	}
	
	function passerArtisteSuivant() public {
		if(tour<13){		
			tour+=1;		
		}
	}
	function artisteEnCours() public constant returns(string){
		return (tour>12)?"FIN":passagesArtistes[tour];
	}
	
}