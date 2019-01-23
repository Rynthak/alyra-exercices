//Import libraries, test wallets and set the network
const bitcoin = require('bitcoinjs-lib')
const { alice } = require('../Bitcoin-Programming-with-BitcoinJS/code/wallets.json')
const network = bitcoin.networks.regtest

//Prepare four key pairs.
const keyPairAlice0 = bitcoin.ECPair.fromWIF(alice[0].wif, network)
const keyPairBob0 = bitcoin.ECPair.fromWIF(bob[0].wif, network)
const keyPairCarol0 = bitcoin.ECPair.fromWIF(carol[0].wif, network)
const keyPairDave0 = bitcoin.ECPair.fromWIF(dave[0].wif, network)

//And an other one for Alice that will redeem the multi-signature funds.
const keyPairAlice1 = bitcoin.ECPair.fromWIF(alice[1].wif, network)
const p2wpkhAlice1 = bitcoin.payments.p2wpkh({pubkey: keyPairAlice1.publicKey, network})