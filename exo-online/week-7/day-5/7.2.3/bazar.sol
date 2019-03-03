pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import "github.com/Rynthak/alyra-exercices/exo-online/week-7/day-5/7.2.2/bazar.sol";
 
contract bazarV3 is bazarV2{
	
	 enum BidChoice { CLASSIC, DUTCH}
	 struct MultiBids {
	     Enchere bid;
	     BidChoice types;
	}
	mapping (uint256 => MultiBids) public allbids;
	
}