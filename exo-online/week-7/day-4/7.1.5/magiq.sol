pragma solidity ^0.5.3;


import "github.com/Rynthak/alyra-exercices/exo-online/week-7/day-4/7.1.4/magiq.sol";


contract ObjetsMagiquesV2 is ObjetsMagiques {
	
	
	function creuser() public payable{
		uint256 tokenId = uint256((blockhash(block.number-1)) )%2999;
		require(msg.value  >= 100 finney,"La somme envoyé n'est pas suffisante");		
		_mint(msg.sender,tokenId);
	}
}