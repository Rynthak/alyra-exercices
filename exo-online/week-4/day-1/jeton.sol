pragma solidity ^0.5.3;

import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

contract JetonMinimal{
	
	mapping (address=>uint256) public comptes;
	using SafeMath for uint; // 
	address public owner;
	
	constructor(uint256 nombreItial) public{
		comptes[msg.sender]=nombreItial;
		owner=msg.sender;
	}
	function transfert(address destinataire, uint256 value) public{
	 
		require(int(comptes[msg.sender]-value)>0,"Pas assez de jetons");
		comptes[destinataire]=comptes[destinataire].add(value);
		comptes[msg.sender]=comptes[msg.sender].sub(value);
		
	}
	
	function minting(address destinataire,uint256 value) public{
		require(msg.sender==owner);
		comptes[msg.sender]=comptes[msg.sender].add(value);
		transfert(destinataire,value);
	}
}