pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract CardsGame is Ownable{	
	string[] public cards;
	uint256 public nbCards;
	using SafeMath for uint256;
	function addCard(string memory hashUrl)public {
		cards.push(hashUrl);
		nbCards=nbCards.add(1);
	}
}