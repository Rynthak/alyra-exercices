pragma solidity ^0.5.3;

import "github.com/Rynthak/alyra-exercices/exo-online/week-7/day-5/7.2.1/bazar.sol";
 
contract bazarV2 is bazar{
	
	mapping (address => uint256) public getmoneyback;
	
	function offre(uint256 _objet) public payable{
		require(objectContract.exists(_objet));
		require(block.number<=bids[_objet].finEnchere);
		require(msg.value>bids[_objet].meilleureOffre);
		getmoneyback[bids[_objet].meilleurAcheteur]=bids[_objet].meilleureOffre;
		bids[_objet].meilleureOffre=msg.value;
		bids[_objet].meilleurAcheteur=msg.sender;
	}
	
	function remboursement() public {
		require(getmoneyback[msg.sender]>0);
		address(msg.sender).transfer(getmoneyback[msg.sender]);
		getmoneyback[msg.sender]=0;
	}
	
	function recupererObjet(uint256 _objet)public {
		require(objectContract.exists(_objet));
		require(block.number > bids[_objet].finEnchere);
		
		address _to = (bids[_objet].meilleurAcheteur ==address(0))?bids[_objet].vendeur:bids[_objet].meilleurAcheteur;
		objectContract.transferFrom(address(this),_to,_objet);
	}
}