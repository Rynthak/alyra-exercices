pragma solidity ^0.5.3;


import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


contract MonstersContract is ERC721 {
	
	
   struct Monster {
		uint64 birthTime;
		uint256[] battles;
   }
   
   struct Battle{
   		uint256 dateBattle;   		
   		uint256 whoWin;
   		uint256 opponent1;
   		uint256 opponent2;
   }
	
   Monster[] public monsters;
   Battle[] public battles;
   
   
 
	function buymonster() public {
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
    
    function battleMonsters(uint256 firstMonster,uint256 secondMonster) public{
    	require(_exists(firstMonster) && _exists(secondMonster));
    	require(ownerOf(firstMonster) == msg.sender);
    	
    	uint256 random=uint256(blockhash(block.number-1));
    	uint256 resultBattle = (random%monsters[firstMonster].birthTime < random%monsters[secondMonster].birthTime)?secondMonster:firstMonster;
    	
    	Battle memory _battle = Battle({
    		dateBattle : uint64(now),
    		whoWin : resultBattle,
    		opponent1  : firstMonster,
    		opponent2  : secondMonster
    	});
    	uint256 newBattleId = battles.push(_battle) - 1; 
    	
    	monsters[firstMonster].battles.push(newBattleId);
    	monsters[secondMonster].battles.push(newBattleId);
    }
    
	
}