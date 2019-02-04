pragma solidity ^0.4.25;

contract JetonMinimal{
	
	mapping (address=>uint256) public comptes;
	
	constructor(uint256 nombreItial){
		comptes[msg.sender]=nombreItial;
	}
	function transfert(address destinataire, uint256 value){
	 
		require(int(comptes[msg.sender]-value)>0,"Pas assez de jetons");
		comptes[destinataire]+=value;
		comptes[msg.sender]-=value;
		
	}
}