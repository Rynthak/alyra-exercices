pragma solidity ^0.5.3;


import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Epinglage is Ownable{	
	bytes32[] public pin;
	uint256 public nbPin;
	using SafeMath for uint256;
	mapping (uint256 => address) public  pinAddress;
	mapping (uint256 => uint256) public  pinDuration;
	event Epingler(
        bytes32 pin,
        uint256 duration
    );
	 
	function payerStockage(bytes32 pinUrl,uint256 duration)public payable {
	 	require(msg.value  >= 100 finney,"La somme envoyé n'est pas suffisante");
	 	uint256 tempduration = now;
	 	tempduration=tempduration.add(duration);
		pin.push(pinUrl);
		pinAddress[nbPin]=msg.sender;
		pinDuration[nbPin]=tempduration;
		nbPin=nbPin.add(1);
		emit Epingler(pinUrl,tempduration);
	}
	
	function removeOldPin() public {
		for (uint i=0; i<nbPin; i++) {
		   if(pinDuration[nbPin]<now){
		   		delete pinDuration[nbPin];
		   		delete pinAddress[nbPin];
		   }
		}
	}
	
	
}