pragma solidity ^0.4.25;
/**
 * @title SafeMath
 * @dev Unsigned math operations with safety checks that revert on error
 */
 /* 
  * Exercice 3.2.3 - Importer la librairie SafeMath

  */
library SafeMath {
    /**
     * @dev Multiplies two unsigned integers, reverts on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
     * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Adds two unsigned integers, reverts on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
     * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
     * reverts when dividing by zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }

}
contract CagnotteFestival {
	mapping(address => uint) organisateurs;
	address [] organisateursList;
	
	using SafeMath for uint256; //
	string[12] sponsors;
	uint creneauxLibresSponsor = 12;
	
	uint256 sponsorRecette;
	uint256 depenseLimitPerDay=10**18;
	uint256 dateNow;
	uint256 actualDepense;
	uint constant DAY_IN_SECONDS = 86400;
	
	uint256 dateLiquidation= 1549297714;
	
	constructor() public {
		organisateurs[msg.sender]=100;
		organisateursList.push(msg.sender);
		
	}
	
	/*Exercice 3.2.1 - Donner le statut d'organisateurs */
	function transfererOrga(address orga, uint parts) public {  
		require(estOrga(msg.sender),"Operation not allowed");
		
		organisateurs[orga]=parts;
		organisateurs[msg.sender]-=parts;
		organisateursList.push(orga);
	}
	function estOrga(address orga) public returns (bool){ 
		return organisateurs[orga]!=0;
	}
	/* Fin Exercice 3.2.1 */
	
	/* Exercice 3.2.2 - Ajouter des sponsors à une liste */
	function sponsoriser(string memory nom) payable{
		require(creneauxLibresSponsor > 0,"Plus de place pour le sponsor");
		require(msg.value>=30*10**18,"Montant inférieurs à 30 ether");
		//Recette des sponsors dépensable
		sponsorRecette+=msg.value;
		
		sponsors[12-creneauxLibresSponsor]=nom;
		creneauxLibresSponsor--;
	}
	
	/* Exercice 3.2.4 - Gérer le temps dans le contrat du festival */

	function depense(uint256 depenseValue) public{
		if(uint256(dateNow/DAY_IN_SECONDS)!=uint256(now/DAY_IN_SECONDS) ){
			dateNow=now;
			actualDepense=depenseLimitPerDay;
			if(depenseLimitPerDay>sponsorRecette){
				actualDepense=sponsorRecette;
			}
		}
		
		require(int256(actualDepense-depenseValue)>=0,"La dépense dépasse le seuil diponible pour aujourd'hui");
		require(int256(sponsorRecette-depenseValue)>=0,"Plus assez de recette à dépenser");
		
		sponsorRecette-=depenseValue;
		actualDepense-=depenseValue;
		
	}
	 
	function liquidationOrganisateur () public{ 
		require(block.timestamp >= dateLiquidation);
		address lastOrg;
		//On liquide les organisateurs
		for (uint i = 0; i < organisateursList.length; i++) {
			
			if(estOrga(organisateursList[i])){
				lastOrg=organisateursList[i];
			}
			
        	delete(organisateurs[organisateursList[i]]);
        	delete(organisateursList[i]);
    	}
    	//Destruction contract
		selfdestruct(lastOrg);
	}
	
}