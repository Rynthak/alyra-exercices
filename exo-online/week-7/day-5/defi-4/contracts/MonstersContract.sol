pragma solidity ^0.5.3;


import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


contract MonstersContract is ERC721 {
	
	
	struct Monster {
		uint64 birthTime;        
        uint256[] battles;         
    }
	
   Monster[] public monsters;
	 
   mapping (uint256 => address) public monsterIndexToOwner;

   
   mapping (address => uint256) ownershipTokenCount;

   // Adresse vers laquelle le transfert à été approuvé
   mapping (uint256 => address) public monsterIndexToApproved;
 
	function buymonster() public payable{
		uint256 tokenId = _createMonster();		
		_mint(msg.sender,tokenId);
	}
	
	function _createMonster() internal  returns (uint){
		Monster memory _monster = Monster({            
            birthTime: uint64(now),
            battles: new uint256[](0)
        });        
        uint256 newMonsterId = monsters.push(_monster) - 1;       
        return newMonsterId;
	}
	
}