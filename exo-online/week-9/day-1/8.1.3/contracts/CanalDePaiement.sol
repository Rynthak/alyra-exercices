
pragma solidity ^0.5.3;


import "github.com/Rynthak/alyra-exercices/exo-online/week-9/day-1/8.1.2/contracts/CanalDePaiement.sol";

contract CanalDePaiementV3 is CanalDePaiementV2 {
	
	 
	 function makeMessage(uint nonce, uint equilibre) public pure return (bytes32){
	 	return  keccak256(abi.encodePacker(nonce,equilibre));
	 }
	 
}