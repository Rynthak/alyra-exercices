pragma solidity ^0.5.3;


import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


contract MonstersContract is ERC721 {
	
	
	struct Monster {
        
        uint256 genes;
        uint64 birthTime;        
        uint64 cooldownEndTime;         
        uint16 generation;
    }
	
	
	 
   mapping (uint256 => address) public monsterIndexToOwner;

   
   mapping (address => uint256) ownershipTokenCount;

   // Adresse vers laquelle le transfert à été approuvé
   mapping (uint256 => address) public monsterIndexToApproved;

   
	
   uint32[14] public cooldowns = [
        uint32(1 minutes),
        uint32(2 minutes),
        uint32(5 minutes),
        uint32(10 minutes),
        uint32(30 minutes),
        uint32(1 hours),
        uint32(2 hours),
        uint32(4 hours),
        uint32(8 hours),
        uint32(16 hours),
        uint32(1 days),
        uint32(2 days),
        uint32(4 days),
        uint32(7 days)
    ];
	uint256 public secondsPerBlock = 15;
	
	function buymonster() public payable{
		uint256 tokenId = uint256((blockhash(block.number-1)) )%3000;		
		_mint(msg.sender,tokenId);
	}
	
	
}