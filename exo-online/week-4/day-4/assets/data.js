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