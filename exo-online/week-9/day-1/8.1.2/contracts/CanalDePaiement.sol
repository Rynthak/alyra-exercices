
pragma solidity ^0.5.3;


import "github.com/Rynthak/alyra-exercices/exo-online/week-9/day-1/8.1.1/contracts/CanalDePaiement.sol"

contract CanalDePaiementV2 is CanalDePaiement {
	
	 
	 function () payable public{
	 	require(msg.value >= montant);
	 	if(msg.sender==partieA){
	 		equilibreA=msg.value;
	 	}
	 	if(msg.sender==partieB){
	 		equilibreB=msg.value;
	 	}
	 	etat = EtatCanal.ACTIF;
	 }
	 
}