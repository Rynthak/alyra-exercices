pragma solidity ^0.5.3;


import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract ClassifiedAds is Ownable{
	using SafeMath for uint256;	
	bytes32[] public ads;
	mapping (bytes32 => address) public  ads_owner;
 	event Ads(
        bytes32 ads
    );
	 
	 
	
	
}