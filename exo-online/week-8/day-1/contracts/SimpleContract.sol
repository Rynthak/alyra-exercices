pragma solidity ^0.5.3;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SimpleContract is Ownable{
	string public name;
	event NameChanged(string name);
	
	constructor(string memory _name) public {
		name = _name;
    }
    
	function setName(string memory _name)  public onlyOwner(){
		name = _name;
		emit NameChanged(_name);
	}
}