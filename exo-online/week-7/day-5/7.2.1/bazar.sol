pragma solidity ^0.5.3;

interface ObjetsMagiquesInterface {
	event Transfer(address indexed _from, address indexed _to, uint256 tokenID);
	
	function balanceOf(address owner) external view returns (uint256 balance);
	function ownerOf(uint256 tokenID) external view returns (address owner);
	function exists(uint256 tokenID) external view returns (bool _exists);
	
	function transferFrom(address from, address to, uint256 tokenID) external;
	function creuser() external;
	function utiliser(uint256 tokenID) external returns (uint256 tirage);
}
contract bazar {
	
	struct Enchere {
	     address meilleurAcheteur;
	     uint256 meilleureOffre;
	     uint256 finEnchere;
	     uint256 objet;
	     address vendeur;
	}
	mapping (uint256 => Enchere) public bids;
	
	ObjetsMagiquesInterface public objectContract;
	
	constructor(ObjetsMagiquesInterface _objectContract) public {
		objectContract = _objectContract;
    }
    
    function proposerALaVente(uint256 _objet) public {
    	require(objectContract.exists(_objet));
    	objectContract.transferFrom(msg.sender,address(this),_objet);
    	bids[_objet]=Enchere(address(0),0,(block.number+1000),_objet,msg.sender);
    }
}