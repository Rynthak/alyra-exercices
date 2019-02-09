 
$(function() {
    
	$('#theModal').on('show.bs.modal', function (e) {
	    var button = $(e.relatedTarget);
	    var modal = $(this);    
	    modal.find('.modal-dialog').load(button.data("remote"));
	});
	
    
	$('[data-rel="connect"]').click(function(){
		
	});
	
	$('[data-rel="register"]').click(function(){
		
	});
	
	
	
});

let initContractMarketPlace = async function(){
	 
	//Init contract Market Place
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	
	
	
	
};




let dapp = null; 

async function createMetaMaskDapp() {
	
	 try {
	   // Demande à MetaMask l'autorisation de se connecter
	   const addresses = await ethereum.enable();
	   const address = addresses[0]
	   // Connection au noeud fourni par l'objet web3
	   const provider = new ethers.providers.Web3Provider(ethereum);
	   dapp = { address, provider };	   
	 } catch(err) {
	    
	   console.error(err);
	 }
}