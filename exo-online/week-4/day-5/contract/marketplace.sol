pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "myStruct.sol";

contract Marketplace is Ownable {
	
	using SafeMath for uint256;
	
	mapping (address => Illustrator) private illustrators;
	mapping (address => Entreprise) private entreprises;
	
	function inscription(string name) public{
		require(illustrators[msg.sender].illustrator_address == address(0),"Vous êtes déjà inscrit");
		illustrators[msg.sender]=Illustrator({name:name,reputation:1,illustrator_address:msg.sender});
	}
	function inscriptionEntreprises(string name){
		require(entreprises[msg.sender].entreprise_address== address(0),"Vous êtes déjà inscrit");
		entreprises[msg.sender]=Entreprise({name:name,entreprise_address:msg.sender});
	}
	
	function banIllustrator(address illustrator) public onlyOwner(){
		require(illustrators[msg.sender].illustrator_address != address(0),"Vous êtes déjà inscrit");
		bannedIllustrator[illustrator].status=StatusIllustratorChoice.BAN;
		bannedIllustrator[illustrator].reputation=0;
	}
	
	function ajouterDemande( uint256 remuneration,uint256 accept_delay,string description,uint256 minimumReput) public payable {
		
		
		entreprises[msg.sender].demandes.push(Demande({remuneration: remuneration, accept_delay: accept_delay,description:description,minimumReput:minimumReput}));
	}
	
}