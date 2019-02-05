pragma solidity ^0.5.3;

import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

contract CagnotteFestival {
	mapping(address => uint) organisateurs;
	 
	mapping(address => bool) festivaliers;
	address [] organisateursList;
	
	using SafeMath for uint256; //
	string[12] sponsors;
	uint creneauxLibresSponsor = 12;
	
	uint256 sponsorRecette;
	uint256 depenseLimitPerDay=1 ether;
	uint256 dateNow;
	uint nbPlacesFestival;
	uint256 actualDepense;
	uint constant DAY_IN_SECONDS = 86400;
	
	uint256 dateLiquidation= 1549297714;
	
	
	 
	
	constructor(uint256 date, uint nbPlaces) public {
		organisateurs[msg.sender]=100;
		organisateursList.push(msg.sender);
		dateLiquidation=date+2 weeks;
		nbPlacesFestival=nbPlaces;
	}
	
	function acheterTicket() public payable{
		requirre(msg.value>( 500 finney),"Place à 0.5 Ethers")
		festivaliers[msg.sender]=true;
	}
	
	function payer(address payble destinataire,uint montant) public {
		require(estOrga(msg.sender));
		require(destinataire !=address(0))
		require(montant>0);
		//Adresse payble
		destinataire.transfer(montant);
	}
	
	function () payable external(){
		
	}

	/*Exercice 3.2.1 - Donner le statut d'organisateurs */
	function transfererOrga(address orga, uint parts) public {  
		require(organisateurs[msg.sender]>=parts,"Operation not allowed");
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
		require(msg.value>=30 ether,"Montant inférieurs à 30 ether");
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