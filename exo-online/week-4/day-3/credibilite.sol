pragma solidity ^0.5.3;


import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";


contract Credibilite {


   using SafeMath for uint256;


   mapping (address => uint256) public cred;
   mapping (bytes32 => bool) private devoirsExists;

   bytes32[] private devoirs;
    
    
   /* Exercice 4.1.1 Rédiger un contrat Crédibilité pour remettre des devoirs */
   
   function produireHash(string memory url) public pure returns(bytes32){
   		return keccak256(bytes(url));
   }
   
   function transfer(address destinataire, uint256 valeur) public{
   		require(destinataire !=address(0));   		
   		require(cred[msg.sender] > valeur);
   		require(cred[destinataire] > 0);    		
   		cred[msg.sender]= cred[msg.sender].sub(valeur);
   		cred[destinataire]  = cred[destinataire].add(valeur);	
   }
   
   function remettre(bytes32 dev) public returns(uint order){   		
   		//Vérification anti triche et antiFraude   		
   		require(devoirsExists[dev]==false,"Petit tricheur ce dévoir existe déjà"); 
   		require(cred[msg.sender]==0,"Tu as déjà rendu ton devoir");  		
   		order = devoirs.length;
   		cred[msg.sender]=(order==0)?cred[msg.sender].add(30):cred[msg.sender].add(10);
   		devoirs.push(dev);
   		devoirsExists[dev]=true;
   		order=order.add(1);  		
   		return order;
   }
   /* End exercice 4.1.1 */
 
}