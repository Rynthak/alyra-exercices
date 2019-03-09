pragma solidity ^0.5.3;


import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/Math.sol";

contract MonstersContract is ERC721 {
	
   using SafeMath for uint256;
   struct Monster {
   		string name;
   		uint dna;
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
   
   uint dnaDigits = 16;
   uint dnaModulus = 10 ** dnaDigits;
   uint cooldownTime = 1 days;
   uint randNonce = 0;
   uint attackVictoryProbability = 70;
 
 
	function buymonster(string memory _name) public {
		uint256 tokenId = _createMonster(_name);		
		_mint(msg.sender,tokenId);
	}
	
	function _createMonster(string memory _name) internal  returns (uint){
		uint randDna = _generateRandomDna(_name);
		randDna = randDna - randDna % 100;
		Monster memory _monster = Monster({
			name: _name,
			dna:   randDna,        
            birthTime: uint64(now),
           	battles: new uint256[](0)
        });        
        uint256 newMonsterId = monsters.push(_monster) - 1;       
        return newMonsterId;
    }
    function _generateRandomDna(string memory _str) private view returns (uint) {
		uint rand = uint(keccak256(abi.encodePacked(_str,msg.sender,now)));
		return rand % dnaModulus;
    }
    function randMod(uint _modulus) internal returns(uint) {
     randNonce = randNonce.add(1);
     return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
    }
    
    
    function battleMonsters(uint256 firstMonster,uint256 secondMonster) public{
    	require(_exists(firstMonster) && _exists(secondMonster));
    	require(ownerOf(firstMonster) == msg.sender);
    	
    	uint rand = randMod(100);
    	uint256 resultBattle = (rand <= attackVictoryProbability)?firstMonster:secondMonster;
    	
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