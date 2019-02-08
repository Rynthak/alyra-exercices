pragma solidity ^0.5.3;


contract Demande{
	uint256 remuneration;
    uint256 accept_delay;
    string description;
    StatusChoice status ;
    uint256 minimumReput ;
    mapping (address => Illustrator) illustrators;
}