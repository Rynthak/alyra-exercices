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
		tour++;
	}
	function artisteEnCours() public constant returns(string){
		return passagesArtistes[tour];
	}
	
}