pragma solidity ^0.4.25;
contract CagnotteFestival {
	mapping(address => uint) organisateurs;
	
	
	
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
}