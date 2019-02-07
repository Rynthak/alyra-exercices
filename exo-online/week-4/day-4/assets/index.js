let stackFunction=[];
$(function() {
    
    stackFunction.push(myBalance);
    stackFunction.push(blockNumber);
    stackFunction.push(gazPrice)
	$('[data-rel="connect"]').click({functionToCall: stackFunction},createMetaMaskDapp);
});

let printResult = function(target,text){
	$(target).html(text);
}


let myBalance = async function(){
	 dapp.provider.getBalance(dapp.address).then((balance) => {
	   let etherString = ethers.utils.formatEther(balance);
	   let text="Balance : " + etherString;
	   console.log(text);
	   printResult('[data-rel="balance"]',text);
	 });
};

let blockNumber = async function(){
	dapp.provider.getBlockNumber().then((blockNumber) => {
		
		let text="Numéro de block : " + blockNumber
		console.log(text);
		printResult('[data-rel="block_number"]',text);
	});
};

let gazPrice = async function(){
	dapp.provider.getGasPrice ( ).then((gas) => {
		 
		let text="Gas Price : " + gas.toString()
		console.log(text);
		printResult('[data-rel="gaz_price"]',text);
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
	   $('[data-rel="result"]').removeClass('d-none');
	   
	 } catch(err) {
	   // Gestion des erreurs
	   console.error(err);
	 }
}