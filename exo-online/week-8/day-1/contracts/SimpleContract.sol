pragma solidity ^0.5.3;


contract SimpleContract {
	string public name;
	constructor(string memory _name) public {
		name = _name;
    }
    
	function setName(string memory _name) public{
		name = _name;
	}
}