const ethers = require('ethers')
const Ipfs= require('ipfs')
const express = require('express')
const app = express()
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
const node = new Ipfs()

node.on('ready', () => {
 console.log("IPFS prêt")
 provider.getNetwork().then(
   r =>  console.log("Ethereum connecté sur ", r)
 )
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})