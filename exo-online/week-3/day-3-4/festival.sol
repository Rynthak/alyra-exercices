pragma solidity ^0.4.25;
contract CagnotteFestival {
	mapping(address => uint) organisateurs;
	string[12] sponsors;
	uint creneauxLibresSponsor = 12;
	
	constructor() public {
		organisateurs[msg.sender]=100;
		
	}
	
	/*Exercice 3.2.1 - Donner le statut d'organisateurs */
	function transfererOrga(address orga, uint parts) public {  
		require(estOrga(msg.sender),"Operation not allowed");
		
		organisateurs[orga]=parts;
		organisateurs[msg.sender]-=parts;
	}
	function estOrga(address orga) public returns (bool){ 
		return organisateurs[orga]!=0;
	}
	/* Fin Exercice 3.2.1 */
	
	/* Exercice 3.2.2 - Ajouter des sponsors à une liste */
	function sponsoriser(string memory nom) payable{
		require(creneauxLibresSponsor > 0,"Plus de place pour le sponsor");
		require(msg.value>=30000000000000000000,"Montant inférieurs à 30 ether");
			
		sponsors[12-creneauxLibresSponsor]=nom;
		creneauxLibresSponsor--;		 
		
		
		
	}
	
	 
	
}