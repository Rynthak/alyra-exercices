pragma solidity ^0.5.3;


contract SimpleContract {
	string public name;
	event NameChanged(string name);
	address private owner;
	
	constructor(string memory _name) public {
		name = _name;
		owner = msg.sender;
    }
    
    modifier isOwner (){
    	require(msg.sender == owner,"Not Allowed");
    	_;
    }
	function setName(string memory _name)  public isOwner(){
		name = _name;
		emit NameChanged(_name);
	}
}