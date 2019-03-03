pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;
import "github.com/Rynthak/alyra-exercices/exo-online/week-7/day-5/7.2.2/bazar.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract bazarV3 is bazarV2{
	
	 using SafeMath for uint256;
	 enum BidChoice { CLASSIC, DUTCH}
	 struct MultiBids {
	     uint256 objet;
	     BidChoice typebid;
	     uint256 value;
	}
	mapping (uint256 => MultiBids) public allbids;
	
	function proposerALaVenteDutch(uint256 _objet,uint256 value) public {
    	require(value>0);
		super.proposerALaVente(_objet);
		allbids[_objet]=MultiBids(_objet,BidChoice.DUTCH,value);
    }
	function proposerALaVente(uint256 _objet) public{
		super.proposerALaVente(_objet);
		allbids[_objet]=MultiBids(_objet,BidChoice.CLASSIC,0);
	}
	function offre(uint256 _objet) public payable{
		require(allbids[_objet].objet==_objet);
		if(allbids[_objet].typebid==BidChoice.CLASSIC){
			super.offre(_objet);
		}else{
			//Calcul de l'enchère hollandaise
			uint256 nbBlocks	= SafeMath.sub(1000, SafeMath.sub(bids[_objet].finEnchere,block.number));
			uint256 discount 	= SafeMath.div(allbids[_objet].value * nbBlocks *10,100); 
			uint256 minPrices	= SafeMath.sub(allbids[_objet].value,discount);
			require(msg.value>=minPrices);
			super.offre(_objet);
		}
	}
	 
	
	
	
}