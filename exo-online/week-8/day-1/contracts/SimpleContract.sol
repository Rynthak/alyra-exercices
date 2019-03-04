pragma solidity ^0.5.3;


contract SimpleContract {
	string public name;
	event NameChanged(string name);
	
	constructor(string memory _name) public {
		name = _name;
    }
    
	function setName(string memory _name) public{
		name = _name;
		emit NameChanged(_name);
	}
}