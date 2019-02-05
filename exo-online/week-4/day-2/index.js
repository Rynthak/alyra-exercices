//Meta Mask asks the dapp use it
const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "comptes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "destinataire",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "minting",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "destinataire",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfert",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "nombreItial",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "payeur",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "destinataire",
				"type": "address"
			}
		],
		"name": "Transfert",
		"type": "event"
	}
];
async function createMetaMaskDapp(){
	const addresses = await ethereum.enable();
	//Const provider
	const provider =  new ethers.providers.Web3Provider(ethereum);
	

	//1 Récupérer le numéro de block et affiché dans la console
	
	const blockNumber =provider.getBlockNumber().then((blockNumber) => {
		console.log("Numéro de block : " + blockNumber);
	});
	
	 
	
	
	
	//2 Récupérer la balance (quantité d'éthers)
	  
	const balance = provider.getBalance(addresses[0]).then((balance) => {
			let etherString = ethers.utils.formatEther(balance);
			console.log("Balance: " + etherString);
	});
	
	
	//3 Récupérer le gas Price
	
	const Gas= provider.getGasPrice ( ).then((gas) => {
		 
		console.log("Gas: " + gas.toString());
	}); 
	
	
	//4 instancier un contract
	let contractAddress = "0xafa39770cf6353178143e55f95f50f2be2d909fb";
	let contract=new ethers.Contract(contractAddress, abi, provider);
	
	//Récupération d'une valeur de mon contract
	let owner = await contract.owner();

	//Propriétaire de mon contract
	console.log(owner);
	
	// Set a new Value, which returns the transaction
	 
	contractWithSigner=contract.connect(provider.getSigner(addresses[0]));
	
	contract.on('Transfert', ( value, payeur, destinataire,event) => {
	    alert('I received ' + value.toString() + ' tokens from ' + payeur +" to "+destinataire);
	});
	
	let tx = await contractWithSigner.transfert('0x744CC80c758B53e6698885ad60B4689C370BCc64',2);
	
	console.log(tx.hash);
	// "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"
	
	
	await tx.wait();
	
	
	let temp = await contract.comptes("0x744CC80c758B53e6698885ad60B4689C370BCc64");

	//Propriétaire de mon contract
	
	//On écoute l'évenement
	console.log("Val account new value: "+temp.toString());
	
	
	 
}

$("#cdwmt").click(createMetaMaskDapp);
$("#cdwmtwallet").click(createMetaMaskDappWallet);
const password = "mypasswords";

 
async function dapp(provider,address,signer){
	
	
	
	 
	

	//1 Récupérer le numéro de block et affiché dans la console
	
	const blockNumber =provider.getBlockNumber().then((blockNumber) => {
		console.log("Numéro de block : " + blockNumber);
	});
	
	
	//2 Récupérer la balance (quantité d'éthers)
	  
	const balance = provider.getBalance(address).then((balance) => {
			let etherString = ethers.utils.formatEther(balance);
			console.log("Balance: " + etherString);
	});
	
	
	//3 Récupérer le gas Price
	
	const Gas= provider.getGasPrice ( ).then((gas) => {
		 
		console.log("Gas: " + gas.toString());
	}); 
	
	
	//4 instancier un contract
	let contractAddress = "0xafa39770cf6353178143e55f95f50f2be2d909fb";
	let contract=new ethers.Contract(contractAddress, abi, provider);
	
	//Récupération d'une valeur de mon contract
	let owner = await contract.owner();

	//Propriétaire de mon contract
	console.log(owner);
	
	// Set a new Value, which returns the transaction
	 
	contractWithSigner=contract.connect(signer);
	
	contract.on('Transfert', ( value, payeur, destinataire,event) => {
	    alert('I received ' + value.toString() + ' tokens from ' + payeur +" to "+destinataire);
	});
	
	let tx = await contractWithSigner.transfert('0x744CC80c758B53e6698885ad60B4689C370BCc64',2);
	
	console.log(tx.hash);
	// "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"
	
	
	await tx.wait();
	
	
	let temp = await contract.comptes("0x744CC80c758B53e6698885ad60B4689C370BCc64");

	//Propriétaire de mon contract
	
	//On écoute l'évenement
	console.log("Val account new value: "+temp.toString());
	
	
}


async function createMetaMaskDappWallet(){
	let wallet;
	let keyStorage="myprivatekey-json";
	let jsonValue=localStorage.getItem(keyStorage);
	const network = 'kovan';
	const provider =  new ethers.getDefaultProvider(network);
	if(jsonValue){
		try{
			wallet=await ethers.Wallet.fromEncryptedJson(jsonValue, password);
			console.log("From Local Storage");
		}catch(e){
			alert("Erreur portefeuille");
		}
	}else{
		console.log("New generated Wallet");
		wallet = ethers.Wallet.createRandom();
		let json  =  await wallet.encrypt(password);
		localStorage.setItem(keyStorage,json);
	} 
	
	
	
	dapp(provider,wallet.address,wallet);
	
}





 


