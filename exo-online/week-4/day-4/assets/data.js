const abiContract = [
	  {
		    "constant": false,
		    "inputs": [
		      {
		        "name": "dev",
		        "type": "bytes32"
		      }
		    ],
		    "name": "remettre",
		    "outputs": [
		      {
		        "name": "",
		        "type": "uint256"
		      }
		    ],
		    "payable": false,
		    "stateMutability": "nonpayable",
		    "type": "function"
		  },
		  {
		    "constant": true,
		    "inputs": [
		      {
		        "name": "",
		        "type": "address"
		      }
		    ],
		    "name": "cred",
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
		    "constant": true,
		    "inputs": [
		      {
		        "name": "dd",
		        "type": "string"
		      }
		    ],
		    "name": "produireHash",
		    "outputs": [
		      {
		        "name": "",
		        "type": "bytes32"
		      }
		    ],
		    "payable": false,
		    "stateMutability": "pure",
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
		        "name": "valeur",
		        "type": "uint256"
		      }
		    ],
		    "name": "transfer",
		    "outputs": [],
		    "payable": false,
		    "stateMutability": "nonpayable",
		    "type": "function"
		  }
		];


const contractAddress = '0x451875bdd0e524882550ec1ce52bcc4d0ff90eae';



/********  CONTRACT CREDIBITY CONST ******/


const abiContractEvent = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "dev",
				"type": "bytes32"
			}
		],
		"name": "remettre",
		"outputs": [
			{
				"name": "order",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "cred",
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
		"constant": true,
		"inputs": [
			{
				"name": "url",
				"type": "string"
			}
		],
		"name": "produireHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "pure",
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
				"name": "valeur",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "payeur",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "destinataire",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "montant",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "dev",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "eleve",
				"type": "address"
			}
		],
		"name": "Remise",
		"type": "event"
	}
]


const contractAddressEvent = '0x8c8096b9c4f2e3480e7d739385b968ca9acc85eb';
//CONTRACT WITHOUT SECURITY for TESTTING
//const  contractAddressEvent = '0x1178fb64af12d28ac5fb2ccbd1a841468174fac7'