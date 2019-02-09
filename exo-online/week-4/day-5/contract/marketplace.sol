pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";


library SharedStructs {
	
	enum StatusIllustratorChoice { ACCEPTE, BAN}
    
    struct Entreprise{
    	 string name;
    	 address entreprise_address;
    	 Demande[] demandes;
    }
    
    struct Illustrator{
    	 string name;
    	 address illustrator_address;
    	 uint256 reputation ;
    	 StatusIllustratorChoice status;
    }    
}

contract Demande{
	uint256 remuneration;
    uint256 accept_delay;
    string description;
    
    enum StatusChoice { OUVERTE, ENCOURS, FERMEE }
    StatusChoice status ;
    uint256 minimumReput ;
    mapping (address => Illustrator) illustrators;
}



contract Marketplace is Ownable {
	
	using SafeMath for uint256;
	
	mapping (address => SharedStructs.Illustrator) private illustrators;
	mapping (address => SharedStructs.Entreprise) private entreprises;
	
	function inscription(string memory name) public{
		require(illustrators[msg.sender].illustrator_address == address(0),"Vous êtes déjà inscrit");
		illustrators[msg.sender]=SharedStructs.Illustrator({name:name,reputation:1,illustrator_address:msg.sender,status:SharedStructs.StatusIllustratorChoice.ACCEPTE});
	}
	function inscriptionEntreprises(string  memory name) public{
		require(entreprises[msg.sender].entreprise_address== address(0),"Vous êtes déjà inscrit");
		entreprises[msg.sender]=SharedStructs.Entreprise(name,msg.sender);
	}
	
	function banIllustrator(address illustrator) public onlyOwner(){
		require(illustrators[msg.sender].illustrator_address != address(0),"Vous êtes déjà inscrit");
		illustrators[illustrator].status=SharedStructs.StatusIllustratorChoice.BAN;
		illustrators[illustrator].reputation=0;
	}
	
	function ajouterDemande( uint256 remuneration,uint256 accept_delay,string memory description,uint256 minimumReput) public payable {
		
		//require(msg.value  == (remuneration * 1.2) );
		//SharedStructs.Demande myDemande= SharedStructs.Demande({remuneration: remuneration, accept_delay: accept_delay,description:description,minimumReput:minimumReput});
		
		entreprises[msg.sender].demandes.push(new Demande(remuneration,accept_delay,description,minimumReput));
	}
	
}