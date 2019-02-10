pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";


library SharedStructs {
	
	enum StatusIllustratorChoice { ACCEPTE, BAN}
    
    struct Entreprise{
    	 string name;
    	 address entreprise_address;
    	
    }
    
    struct Illustrator{
    	 string name;
    	 address illustrator_address;
    	 uint256 reputation ;
    	 StatusIllustratorChoice status;
    }    
}

contract Demande is Ownable{
	uint256 public remuneration;
    uint256 public accept_delay;
    string description;
    
    enum StatusChoice { OUVERTE, ENCOURS, FERMEE }
    StatusChoice public status ;
    uint256 public minimumReput ;
    address[] illustrators;
    mapping (address => bool)  illustratorsPostuled;
    address private myIllustrator ;
    bytes32 private urlHash;
    
    constructor(uint256 _remuneration,uint256 _accept_delay,string memory _description,uint256 _minimumReput) public{
		 
		remuneration=_remuneration;
		accept_delay=_accept_delay;
		description=_description;
		minimumReput=_minimumReput;
		status=StatusChoice.OUVERTE;
	} 
	
	function isOpen() public view returns (bool){
		return uint(status)==uint(StatusChoice.OUVERTE);
	}
	
	function isPending() public view returns (bool){
		return uint(status)==uint(StatusChoice.ENCOURS);
	}
	function checkPostuled(address illustrator) public view returns (bool){
	    return (illustratorsPostuled[illustrator] == false);
	}
	function addIllustrator(address illustrator) public onlyOwner() {
	    illustratorsPostuled[illustrator]=true;
	    illustrators.push(illustrator);
	}	
	function acceptOneIllustrator(address illustrator) public onlyOwner() {
	    myIllustrator=illustrator;	    
	}	
	function isMyIllustrator(address illustrator) public view onlyOwner() returns (bool) {
	    return (myIllustrator==illustrator);	    
	}	
	function changeStatus(StatusChoice newstatus) public onlyOwner(){
		status=newstatus;
	}	
	function updateWork(bytes32 _urlHash) public onlyOwner(){
		urlHash=_urlHash;
	}
	
	function produireHash(string memory url) public pure returns(bytes32){
   		return keccak256(bytes(url));
	}
   
	    
}



contract Marketplace is Ownable {
	
	using SafeMath for uint256;
	
	mapping (address => SharedStructs.Illustrator) private illustrators;
	mapping (address => SharedStructs.Entreprise) private entreprises;
	mapping (uint => address) private entreprisesDemandes;
	address[] public entreprisesList;
	address[] public illustratorsList;
	Demande[] private demandes ;
	
	modifier onlyIllustrator() {
       require(illustrators[msg.sender].illustrator_address != address(0));
       _;
    }
    modifier onlyIllustratorNotBanned() {
       require(illustrators[msg.sender].status !=SharedStructs.StatusIllustratorChoice.BAN);
       _;
    }
	modifier onlyEntrepriseOwner(uint256 offerIndex) {
       require(entreprisesDemandes[offerIndex]==msg.sender);
       _;
    }
	
	function inscription(string memory name) public{
		require(illustrators[msg.sender].illustrator_address == address(0),"Vous êtes déjà inscrit");
		illustrators[msg.sender]=SharedStructs.Illustrator({name:name,reputation:1,illustrator_address:msg.sender,status:SharedStructs.StatusIllustratorChoice.ACCEPTE});
		illustratorsList.push(msg.sender);
	}
	function inscriptionEntreprises(string  memory name) public{
		require(entreprises[msg.sender].entreprise_address== address(0),"Vous êtes déjà inscrit");
		entreprises[msg.sender]=SharedStructs.Entreprise(name,msg.sender);
		entreprisesList.push(msg.sender);
	}
	
	function banIllustrator(address illustrator) public onlyOwner(){
		require(illustrators[msg.sender].illustrator_address != address(0),"Vous êtes déjà inscrit");
		illustrators[illustrator].status=SharedStructs.StatusIllustratorChoice.BAN;
		illustrators[illustrator].reputation=0;
	}
	
	function ajouterDemande( uint256 remuneration,uint256 accept_delay,string memory description,uint256 minimumReput) public payable {
		//On check que la remunaration + 2 % = le paiement reçu
		require(entreprises[msg.sender].entreprise_address != address(0),"Pas d'entreprises à ce nom");
		uint256 commission = SafeMath.div(SafeMath.mul(remuneration,2),100);
		require(msg.value  == commission + remuneration );	
		entreprisesDemandes[demandes.length]=msg.sender;	
		demandes.push(new Demande(remuneration,accept_delay,description,minimumReput));
		
	}
	
	function listsOffers() public view returns (Demande[] memory){
		 return demandes;
	}
	function getMyAccountEnterpise() public view returns (SharedStructs.Entreprise memory){
		
		return entreprises[msg.sender];
	}
	
	function postuler(uint256 offerIndex) public onlyIllustrator() onlyIllustratorNotBanned(){
		require(demandes[offerIndex].isOpen());
		require(!demandes[offerIndex].checkPostuled(msg.sender));
		//Vérification réputation minimul du graphiste
		require(illustrators[msg.sender].reputation >= demandes[offerIndex].minimumReput());
		
		//Vérification date limite dépôt candisature
		require(now<=demandes[offerIndex].accept_delay());		
		demandes[offerIndex].addIllustrator(msg.sender);
	}
	function accepterOffre(uint256 offerIndex,address illustrator) public onlyEntrepriseOwner(offerIndex){
		require(demandes[offerIndex].isOpen());				
		demandes[offerIndex].changeStatus(Demande.StatusChoice.ENCOURS);
		demandes[offerIndex].acceptOneIllustrator(illustrator);		
	}
	function livraison(uint256 offerIndex,bytes32 hashUrl)public {
		require(demandes[offerIndex].isPending());
		require(demandes[offerIndex].isMyIllustrator(msg.sender));		
		demandes[offerIndex].updateWork(hashUrl);	
		demandes[offerIndex].changeStatus(Demande.StatusChoice.FERMEE);
		//On modifie la répuration du graphiste
		illustrators[msg.sender].reputation=illustrators[msg.sender].reputation.add(1);		
		
		
		msg.sender.transfer(demandes[offerIndex].remuneration());
		
			
	}
	
	
	
	
}