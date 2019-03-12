
pragma solidity ^0.5.3;


import "github.com/Rynthak/alyra-exercices/exo-online/week-9/day-1/8.1.3/contracts/CanalDePaiement.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/cryptography/ECDSA.sol";


contract CanalDePaiementV4 is CanalDePaiementV3 {
	
	 
	 function fermeture(uint _nonce, uint _equilibreA) public {
		require(partieA == msg.sender|| partieB == msg.sender);
		require(etat== EtatCanal.ACTIF);
		dernierNonce=_nonce;
		equilibreA=_equilibreA;	 
		blocFermeture = block.number;
     	etat = EtatCanal.FERME;
	 }
	 
}