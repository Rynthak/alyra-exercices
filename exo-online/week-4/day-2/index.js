//Meta Mask asks the dapp use it

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
		 
		console.log("Gas: " + gas);
	}); 
	
	
	//4 instancier un contract
	let abi = [
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
		}
	];

	 
	
	let contractAddress = "0xb843c93f02485e16623bb816dc37fe1e5e88a9be";
	let contract=new ethers.Contract(contractAddress, abi, provider);
	
	 

	console.log(contract);
	 
}

$("#cdwmt").click(createMetaMaskDapp);









 


