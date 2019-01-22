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


const keyPairAlice0 = bitcoin.ECPair.fromWIF(alice[0].wif, network)
const p2wpkhAlice0 = bitcoin.payments.p2wpkh({pubkey: keyPairAlice0.publicKey, network})


const txb = new bitcoin.TransactionBuilder(network)


console.log(txb);
// 'TX_ID' = bitcoin-cli getrawtransaction fa3b58e53bca1c3b63c634b62bdd233aa0c6c3eddbb98d2bb69327bc5f76a289 true
//txid
txb.addInput('fa3b58e53bca1c3b63c634b62bdd233aa0c6c3eddbb98d2bb69327bc5f76a289', 0);


txb.addOutput(p2wpkhAlice0.address, 999e5);


const tx = txb.buildIncomplete();


const InputScriptP2SH = bitcoin.script.compile([bitcoin.opcodes.OP_2, bitcoin.opcodes.OP_3, p2sh.redeem.output])
tx.setInputScript(0, InputScriptP2SH)

console.log('tx.toHex()  ', tx.toHex());

//020000000116b232cc1230b35ceda5740b073b8058017f5bf91915f830e42e772b9987382e0000000006525303935587ffffffff01605af40500000000160014fb8820f35effa054399540b8ca86040d8ddaa4d500000000


//bitcoin-cli sendrawtransaction 020000000116b232cc1230b35ceda5740b073b8058017f5bf91915f830e42e772b9987382e0000000006525303935587ffffffff01605af40500000000160014fb8820f35effa054399540b8ca86040d8ddaa4d500000000