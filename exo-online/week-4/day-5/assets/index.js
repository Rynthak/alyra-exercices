 
$(function() {
    
    
	 
	
	
	
});

 

async function createMetaMaskDapp(event) {
	
	 try {
	   // Demande à MetaMask l'autorisation de se connecter
	   const addresses = await ethereum.enable();
	   const address = addresses[0]
	   // Connection au noeud fourni par l'objet web3
	   const provider = new ethers.providers.Web3Provider(ethereum);
	   dapp = { address, provider };
	   
	   
	   $.each(event.data.functionToCall,function(index, value){
		   value();
	   })
	   
	   
	 } catch(err) {
	   // Gestion des erreurs
	   console.error(err);
	 }
}