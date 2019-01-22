const bitcoin = require('bitcoinjs-lib')
const { alice } = require('../Bitcoin-Programming-with-BitcoinJS/code/wallets.json')
const network = bitcoin.networks.regtest


//bitcoin-cli sendtoaddress bcrt1qlwyzpu67l7s9gwv4gzuv4psypkxa4fx4ggs05g 1
//d4c4088865e8eb33b1cc3b1df4d32b67c218968dc6e1f18c9e557be1d6d2ac83

//bitcoin-cli gettransaction d4c4088865e8eb33b1cc3b1df4d32b67c218968dc6e1f18c9e557be1d6d2ac83

//Creating the transaction
const keyPairAlice0 = bitcoin.ECPair.fromWIF(alice[0].wif, network)
const p2wpkhAlice0 = bitcoin.payments.p2wpkh({pubkey: keyPairAlice0.publicKey, network})

//Create a BitcoinJS transaction builder object.

const txb = new bitcoin.TransactionBuilder(network)

//bitcoin-cli gettransaction d4c4088865e8eb33b1cc3b1df4d32b67c218968dc6e1f18c9e557be1d6d2ac83 true

txb.addInput('d4c4088865e8eb33b1cc3b1df4d32b67c218968dc6e1f18c9e557be1d6d2ac83', 1, null, p2wpkhAlice0.output)


const data = Buffer.from('Programmable money FTW!', 'utf8')
const embed = bitcoin.payments.embed({data: [data]})
txb.addOutput(embed.output, 0)
txb.addOutput(p2wpkhAlice0.address, 99900000)//Rdcupèration du change

//Don't forget the input value, necessary because we are spending a P2WPKH.

txb.sign(0, keyPairAlice0, null, null, 1e8)

const tx = txb.build()
console.log('tx.toHex()', tx.toHex())

//bitcoin-cli decoderawtransaction 0200000000010183acd2d6e17b559e8cf1e1c68d9618c2672bd3f41d3bccb133ebe8658808c4d40100000000ffffffff020000000000000000196a1750726f6772616d6d61626c65206d6f6e65792046545721605af40500000000160014fb8820f35effa054399540b8ca86040d8ddaa4d502483045022100b00c645965cda32f37d2e3ecccdfca6d857ee708e1e1da9f3cb7564ecdbb8522022078fe0923203172f6f0ed114068fe6d58efad00a5bac03a9d8d9896d33b84fafe012103745c9aceb84dcdeddf2c3cdc1edb0b0b5af2f9bf85612d73fa6394758eaee35d00000000
//bitcoin-cli sendrawtransaction 0200000000010183acd2d6e17b559e8cf1e1c68d9618c2672bd3f41d3bccb133ebe8658808c4d40100000000ffffffff020000000000000000196a1750726f6772616d6d61626c65206d6f6e65792046545721605af40500000000160014fb8820f35effa054399540b8ca86040d8ddaa4d502483045022100b00c645965cda32f37d2e3ecccdfca6d857ee708e1e1da9f3cb7564ecdbb8522022078fe0923203172f6f0ed114068fe6d58efad00a5bac03a9d8d9896d33b84fafe012103745c9aceb84dcdeddf2c3cdc1edb0b0b5af2f9bf85612d73fa6394758eaee35d00000000
//bitcoin-cli getrawtransaction 6f836d2bb69b3676aaca19e91997e46544eb8ca118a0fb4635de52399c9fcafd true

//echo 50726f6772616d6d61626c65206d6f6e65792046545721 | xxd -p -r