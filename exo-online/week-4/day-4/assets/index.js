let stackFunction=[];
$(function() {
    
    stackFunction.push(myBalance);
    stackFunction.push(blockNumber);
    stackFunction.push(gazPrice);
    
    stackFunction.push(function(){$('[data-rel="result"]').removeClass('d-none');});
    
	$('[data-rel="connect"]').click({functionToCall: stackFunction},createMetaMaskDapp);
	
	$('[data-rel="send_dev"]').click(function(e){
		let urlDev=$("#url_dev").val().trim();
		
		if(urlDev==""){
			alert("Veuillez saisir l'url de votre devoir");
			return false;
		}
		let event={data:{functionToCall:[sendDev]}};
		createMetaMaskDapp(event);
		
	});
	$('[data-rel="send_dev_event"]').click(function(e){
		let urlDev=$("#url_dev_event").val().trim();
		
		if(urlDev==""){
			alert("Veuillez saisir l'url de votre devoir(event)");
			return false;
		}
		let event={data:{functionToCall:[sendDevEvent]}};
		createMetaMaskDapp(event);
		
	});
	 
	
	
	
});

let printResult = function(target,text){
	$(target).html(text);
}

let contractCredibility = async function(){
	 
	let contratCredibilite=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let maCredibilite = await contratCredibilite.cred(dapp.address);
	
	
	let text="Crédit actuel : " + maCredibilite.toString()
	console.log(text);
	printResult('[data-rel="cred"]',text);
	$('[data-rel="cred"]').removeClass('d-none')
	
};


let sendDev = async function(){
	let contratCredibilite=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	
	
	let urlDev=$("#url_dev").val().trim();
	//Récupération du hash du devoir
	let hashDevoir = await contratCredibilite.produireHash(urlDev);
	
	
	//Envoie du hash du devoir
	//console.log(hashDevoir.toString());
	
	contractWithSigner=contratCredibilite.connect(dapp.provider.getSigner());
	let tx = await contractWithSigner.remettre(hashDevoir.toString());
	
	console.log(tx.hash);
	
	await tx.wait();
	
	contractCredibility();
};


let sendDevEvent = async function(){
	let contratCredibilite=new ethers.Contract(contractAddressEvent, abiContractEvent, dapp.provider);
	
	
	let urlDev=$("#url_dev_event").val().trim();
	//Récupération du hash du devoir
	let hashDevoir = await contratCredibilite.produireHash(urlDev);
	
	
	//Envoie du hash du devoir
	//console.log(hashDevoir.toString());
	
	contratCredibilite.on('Remise', (dev, eleve) => {
		$.growl({ title: "Remise de devoir", message: "Le devoir "+dev+" a été remis par "+eleve });
	});
	
	contractWithSigner=contratCredibilite.connect(dapp.provider.getSigner());
	let tx = await contractWithSigner.remettre(hashDevoir.toString());
	
	
	
	
	console.log(tx.hash);
	
	await tx.wait();
};



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
	   
	   
	 } catch(err) {
	   // Gestion des erreurs
	   console.error(err);
	 }
}