pragma solidity ^0.5.3;

contract bazar {
	
	struct enchere {
	     address meilleurAcheteur;
	     uint256 meilleureOffre;
	     uint256 finEnchere;
	     uint256 objet;
	     address vendeur;
	}
	
	address objectContract public;
	
	constructor(address _objectContract) public {
		objectContract = _objectContract;
    }
}