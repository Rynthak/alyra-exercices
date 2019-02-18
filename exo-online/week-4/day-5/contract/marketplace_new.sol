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
		 uint256 nbIllustrator;
		
		 		 
    }   
	
	using SafeMath for uint256;
	
	mapping (address => Account) public accountList;	 
	mapping (uint => address) public entreprisesDemandes;
	mapping (uint =>mapping(address => bool)) public postuled;	
	mapping (uint => bytes32) private hashdev;
	mapping (uint => address) public affectedDev;	
		 
	Demande[] public demandes ;
	uint256 public nbDemandes;
	
	modifier onlyIllustrator() {
       require(accountList[msg.sender].account_address != address(0) && accountList[msg.sender].role == AccountRole.ILLUSTRATOR);
       _;
    }
    modifier onlyIllustratorNotBanned() {
       require(accountList[msg.sender].status ==AccountStatusChoice.ACCEPTE);
       _;
    }
	modifier onlyEntrepriseOwner(uint256 offerIndex) {
       require(entreprisesDemandes[offerIndex]==msg.sender);
       _;
    }
	 
	function inscription(string memory name,AccountRole role) public{		 
		accountList[msg.sender]=Account({name:name,reputation:1,account_address:msg.sender,status:AccountStatusChoice.ACCEPTE,role:role});
		 
	}	 
	function ajouterDemande( uint256 remuneration,uint256 accept_delay,string memory description,uint256 minimumReput) public payable {
		//On check que la remunaration + 2 % = le paiement reçu		 
		uint256 commission = SafeMath.div(SafeMath.mul(remuneration,2),100);
		require(msg.value  == commission + remuneration,"La somme envoyé n'est pas suffisante");	
		entreprisesDemandes[demandes.length]=msg.sender;	
		demandes.push(Demande(remuneration,minimumReput,description,StatusChoice.OUVERTE,accept_delay, new address[](0),0));
		nbDemandes=nbDemandes.add(1);		
	}
	function postuler(uint256 offerIndex) public {
		require(demandes[offerIndex].status==StatusChoice.OUVERTE,"La demande n'est pas ouverte");
		require(postuled[offerIndex][msg.sender]==false,"Vous avez déjà postulé");		 
		require(accountList[msg.sender].reputation >= demandes[offerIndex].minimumReput,"Vous n'avez pas la réputation requise");
		postuled[offerIndex][msg.sender]=true;
		demandes[offerIndex].nbIllustrator=demandes[offerIndex].nbIllustrator.add(1);
		demandes[offerIndex].listIllustrator.push(msg.sender);	   	
	}
	function accepterOffre(uint256 offerIndex,address illustrator) public onlyEntrepriseOwner(offerIndex){
		require(demandes[offerIndex].status==StatusChoice.OUVERTE,"La demande n'est pas ouverte");				
		demandes[offerIndex].status = StatusChoice.ENCOURS;
		affectedDev[offerIndex]= (illustrator);		
	}
	function livraison(uint256 offerIndex,bytes32 hashUrl)public {
		require(demandes[offerIndex].status==StatusChoice.ENCOURS,"La demande n'est pas en cours");
		require(affectedDev[offerIndex] == msg.sender,"Vous n'êtes pas affecté à cette demande");		
		hashdev[offerIndex]=hashUrl;	
		demandes[offerIndex].status = StatusChoice.FERMEE;
		//On modifie la répuration du graphiste
		accountList[msg.sender].reputation=accountList[msg.sender].reputation.add(1);		
		address(msg.sender).transfer(demandes[offerIndex].remuneration);			
	}
	function getListOfIllustrator(uint256 offerIndex,uint256 index) public view returns(address){
		return demandes[offerIndex].listIllustrator[index];
	}
	
		
	
}