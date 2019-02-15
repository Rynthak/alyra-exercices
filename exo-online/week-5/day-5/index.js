const ethers = require('ethers')
const Ipfs= require('ipfs')

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
const node = new Ipfs()

node.on('ready', () => {
 console.log("IPFS prêt")
 provider.getNetwork().then(
   r =>  console.log("Ethereum connecté sur ", r)
 )
})