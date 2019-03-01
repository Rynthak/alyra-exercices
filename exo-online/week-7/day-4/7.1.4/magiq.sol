pragma solidity ^0.5.3;


import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";
library Counters {
    using SafeMath for uint256;

    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        counter._value += 1;
    }

    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}

contract ERC721Simple {
 event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
 using SafeMath for uint256;	
 mapping (uint256 => address) private tokens;
 using Counters for Counters.Counter;
 mapping (address => Counters.Counter) private _ownedTokensCount;
 

 function balanceOf(address _owner) public view returns (uint256 balance){
 	require(_owner != address(0));
 	return _ownedTokensCount[_owner].current();
 }
 function ownerOf(uint256 _tokenId) public view returns (address _owner){
 	return tokens[_tokenId];
 }
 function exists(uint256 _tokenId) public view returns (bool){
 	address owner = tokens[_tokenId];
    return owner != address(0);
 }

 function transferFrom(address _from, address _to, uint256 _tokenId) public{
 	require(tokens[_tokenId] == msg.sender);
 	require(tokens[_tokenId] == _from);
 	require(_to != address(0));
 	tokens[_tokenId]=_to;
 	
 	_ownedTokensCount[_from].decrement();
    _ownedTokensCount[_to].increment();
 	
 	emit Transfer(_from,_to,_tokenId);
 }
 
 function _mint(address to, uint256 tokenId) internal {
        require(to != address(0));
        require(!exists(tokenId));

        tokens[tokenId] = to;
        _ownedTokensCount[to].increment();

        emit Transfer(address(0), to, tokenId);
 }
 
 
}


contract ObjetsMagiques is ERC721Simple , Ownable {
	using SafeMath for uint256;
	
	function buyToken(uint256 tokenId)public payable{
		require(msg.value  >= 100 finney,"La somme envoyé n'est pas suffisante");		
		_mint(msg.sender,tokenId);
	}
	
}