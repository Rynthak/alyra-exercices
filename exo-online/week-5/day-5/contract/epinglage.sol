pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Epinglage is Ownable{	
	string[] public pin;
	uint256 public nbPin;
	using SafeMath for uint256;
	event Epingler(
        string pin
    );
	 
	 function payerStockage(string memory pinUrl)public payable {
		pin.push(pinUrl);
		nbPin=nbPin.add(1);
		emit Epingler(pin);
	}
}