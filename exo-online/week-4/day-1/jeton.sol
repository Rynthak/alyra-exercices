pragma solidity ^0.5.3;

import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

contract JetonMinimal{
	
	mapping (address=>uint256) public comptes;
	using SafeMath for uint; // 
	address public owner;
	uint256 dateEmission=0;
	event Transfert(uint256,address payeur,address destinataire);
	
	constructor(uint256 nombreItial) public{
		comptes[msg.sender]=nombreItial;
		owner=msg.sender;
	}
	function transfert(address destinataire, uint256 value) public{
	 
		require(int(comptes[msg.sender]-value)>0,"Pas assez de jetons");
		comptes[destinataire]=comptes[destinataire].add(value);
		comptes[msg.sender]=comptes[msg.sender].sub(value);
		emit Transfert(valeur,msg.sender,destinataire)
	}
	
	function minting(address destinataire,uint256 value) public{
		require(msg.sender==owner);
		require(dateEmission + 1 weeks <= now);
		comptes[msg.sender]=comptes[msg.sender].add(value);
		transfert(destinataire,value);
		dateEmission=now;
	}
}