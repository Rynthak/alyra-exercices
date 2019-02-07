let stackFunction=[];
$(function() {
    
    stackFunction.push(myBalance);
    stackFunction.push(blockNumber);
    stackFunction.push(gazPrice)
	$('[data-rel="connect"]').click({functionToCall: stackFunction},createMetaMaskDapp);
});

let myBalance = async function(){
	 dapp.provider.getBalance(dapp.address).then((balance) => {
	   let etherString = ethers.utils.formatEther(balance);
	   console.log("Balance: " + etherString);
	 });
};

let blockNumber = async function(){
	dapp.provider.getBlockNumber().then((blockNumber) => {
		console.log("Numéro de block : " + blockNumber);
	});
};

let gazPrice = async function(){
	dapp.provider.getGasPrice ( ).then((gas) => {
		console.log("Gas: " + gas.toString());
	}); 
}

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