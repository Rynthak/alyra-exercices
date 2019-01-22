const bitcoin = require('bitcoinjs-lib')
const { alice } = require('../Bitcoin-Programming-with-BitcoinJS/code/wallets.json')
const network = bitcoin.networks.regtest

const redeemScript = bitcoin.script.compile([
	  bitcoin.opcodes.OP_ADD,
	  bitcoin.opcodes.OP_5,
	  bitcoin.opcodes.OP_EQUAL])
  
console.log('redeemScript  ', redeemScript.toString('hex'))  

// decodescript bitcoin-cli decodescript 935587

const p2sh = bitcoin.payments.p2sh({redeem: {output: redeemScript, network}, network})
console.log('p2sh.address  ', p2sh.address)

// On paye un script
// sendtoaddress 2N7WfHK1ftrTdhWej8rnFNR7guhvhfGWwFR 1 ( p2sh script)

//fa3b58e53bca1c3b63c634b62bdd233aa0c6c3eddbb98d2bb69327bc5f76a289

//bitcoin-cli generate 1

//bitcoin-cli getrawtransaction fa3b58e53bca1c3b63c634b62bdd233aa0c6c3eddbb98d2bb69327bc5f76a289 true
