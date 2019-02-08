pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Marketplace is Ownable {
	
	using SafeMath for uint256;
	
	mapping (address => uint256) private illustratorReputation;
	mapping (address => string) private illustratorName;
	mapping (address => bool) private bannedIllustrator;
	
	function inscription(string name) public{
		
		require(illustratorReputation[msg.sender]==0,"Vous êtes déjà inscrit");
		require(bannedIllustrator[msg.sender]==false);
		
		illustratorReputation[msg.sender]=1;
		illustratorName[msg.sender]=name;
	}
	
}