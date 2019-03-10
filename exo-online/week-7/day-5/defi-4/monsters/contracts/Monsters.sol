pragma solidity ^0.5.0;


import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/math/Math.sol";

contract Monsters is ERC721 {
	
   using SafeMath for uint256;
   
   enum Living {ALIVE,DEAD_IN_BATTLE, SUICIDE}
   
   
   struct Monster {
   		string name;
   		uint dna;
   		Living status; 
   		uint256 value;
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
 
 
	function buymonster(string memory _name) public payable{
		require(msg.value  >= 100 finney,"La somme envoyé n'est pas suffisante");
		uint256 tokenId = _createMonster(_name,msg.value);		
		_mint(msg.sender,tokenId);
	}
	
	function _createMonster(string memory _name , uint256 valueAmount) internal  returns (uint){
		uint randDna = _generateRandomDna(_name);
		randDna = randDna - randDna % 100;
		Monster memory _monster = Monster({
			name: _name,
			status : Living.ALIVE,			 
			dna:   randDna,
			value : valueAmount,        
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
    	require(firstMonster!=secondMonster);
    	require(ownerOf(firstMonster) == msg.sender);
    	
    	
    	Monster storage myMonster = monsters[firstMonster];
    	Monster storage enemyMonster = monsters[secondMonster];
    	
    	uint rand = randMod(100);
    	uint256 resultBattle = (rand <= attackVictoryProbability)?firstMonster:secondMonster;
    	
    	Battle memory _battle = Battle({
    		dateBattle : uint64(now),
    		whoWin : resultBattle,
    		opponent1  : firstMonster,
    		opponent2  : secondMonster
    	});
    	uint256 newBattleId = battles.push(_battle) - 1; 
    	
    	myMonster.battles.push(newBattleId);
    	enemyMonster.battles.push(newBattleId);
    	
    	if(resultBattle == firstMonster){
    		myMonster.value = myMonster.value.add(1 finney);
    		enemyMonster.value = enemyMonster.value.sub(1 finney);
    	}else{
    		enemyMonster.value = enemyMonster.value.add(1 finney);
    		myMonster.value = myMonster.value.sub(1 finney);
    	}
    	//Kill enemyMonster
    	if(enemyMonster.value==0){
    		enemyMonster.status = Living.DEAD_IN_BATTLE;
    		_burn(ownerOf(secondMonster),secondMonster);
    	}
    	//Kill MyMonster
    	if(myMonster.value==0){
    		myMonster.status = Living.DEAD_IN_BATTLE;
    		_burn(ownerOf(firstMonster),firstMonster);
    	}
    }
    function killMyMonster(uint256 _tokenId) public{
    	require(_exists(_tokenId));
    	require(ownerOf(_tokenId) == msg.sender);
    	Monster storage myMonster = monsters[_tokenId];
    	
    	address(msg.sender).transfer(myMonster.value);
    	myMonster.status = Living.SUICIDE;
    	myMonster.value = 0;
    	_burn(ownerOf(_tokenId),_tokenId);
    }
    /**
     * Return the number of total registered users.
     */
    function totalMonsters() public view returns (uint)
    {
        return monsters.length - 1;
    }
	
}