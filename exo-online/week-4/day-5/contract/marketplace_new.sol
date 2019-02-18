pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Marketplace is Ownable {
	
	enum AccountStatusChoice { ACCEPTE, BAN}    
	enum StatusChoice { OUVERTE, ENCOURS, FERMEE }
   	enum AccountRole { CUSTOMER, ILLUSTRATOR}
    struct Account{
    	 string name;
    	 address account_address;
    	 uint256 reputation ;
    	 AccountStatusChoice status;
    	 AccountRole role ;
    	 
    }
    struct Demande{
    	 uint256 remuneration;
    	 uint256 minimumReput ;
		 string  description;		
		 StatusChoice  status ;
		 uint256 accept_delay;
		 address[] listIllustrator;
		
		 		 
    }   
	
	using SafeMath for uint256;
	
	mapping (address => Account) public accountList;	 
	mapping (uint => address) public entreprisesDemandes;
	mapping (uint =>mapping(address => bool)) public postuled;	
		 
	Demande[] public demandes ;
	uint256 public nbDemandes;
	
	 
	function inscription(string memory name,AccountRole role) public{		 
		accountList[msg.sender]=Account({name:name,reputation:1,account_address:msg.sender,status:AccountStatusChoice.ACCEPTE,role:role});
		 
	}	 
	function ajouterDemande( uint256 remuneration,uint256 accept_delay,string memory description,uint256 minimumReput) public payable {
		//On check que la remunaration + 2 % = le paiement reçu		 
		uint256 commission = SafeMath.div(SafeMath.mul(remuneration,2),100);
		require(msg.value  == commission + remuneration,"La somme envoyé n'est pas suffisante");	
		entreprisesDemandes[demandes.length]=msg.sender;	
		demandes.push(Demande(remuneration,minimumReput,description,StatusChoice.OUVERTE,accept_delay, new address[](0)));
		nbDemandes=nbDemandes.add(1);		
	}
	function postuler(uint256 offerIndex) public {
		require(demandes[offerIndex].status==StatusChoice.OUVERTE,"La demande n'est pas ouverte");
		require(postuled[offerIndex][msg.sender]==false,"Vous avez déjà postulé");		 
		require(accountList[msg.sender].reputation >= demandes[offerIndex].minimumReput,"Vous n'avez pas la réputation requise");
		postuled[offerIndex][msg.sender]=true;
		demandes[offerIndex].listIllustrator.push(msg.sender);	   	
	}
	
		
	
}