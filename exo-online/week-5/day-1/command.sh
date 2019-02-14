
#ALICE

geth --datadir /Users/rynthak/privateChain/alice --syncmode 'full' --port 30311 --rpc --rpcaddr 'localhost' --rpcport 30312 --rpcapi 'personal,db,eth,net,web3,txpool,miner, clique' --bootnodes 'enode://50f5941059466a663d7716dcd7c93751d7c301506a145a1a39f36420fd995fd0ca783b1d48ea9970d71063696749851a92891374136e19c0b68947348712aee3@127.0.0.1:30310' --networkid 20807 --gasprice '0' -unlock '0df654ca0dc48d9d3f1149d7311f04e1919bd31d' --password ~/pass2.txt --mine 



#BOB

geth --datadir /Users/rynthak/privateChain/bob --syncmode 'full' --port 30313 --rpc --rpcaddr 'localhost' --rpcport 30314 --rpcapi 'personal,db,eth,net,web3,txpool,miner, clique' --bootnodes 'enode://50f5941059466a663d7716dcd7c93751d7c301506a145a1a39f36420fd995fd0ca783b1d48ea9970d71063696749851a92891374136e19c0b68947348712aee3@127.0.0.1:30310' --networkid 20807 --gasprice '0' -unlock 'fbd003210885eb2e8513bff76f0b56353d89678d' --password ~/pass.txt --mine 


#Claudia

geth --datadir /Users/rynthak/privateChain/claudia --syncmode 'full' --port 30315 --rpc --rpcaddr 'localhost' --rpcport 30316 --rpcapi 'personal,db,eth,net,web3,txpool,miner, clique' --bootnodes 'enode://50f5941059466a663d7716dcd7c93751d7c301506a145a1a39f36420fd995fd0ca783b1d48ea9970d71063696749851a92891374136e19c0b68947348712aee3@127.0.0.1:30310' --networkid 20807 --gasprice '0' -unlock '675eaecc352002d6f9a3fa25241ea3f2937185cf' --password ~/pass.txt --mine 


# CONNECTION geth ALICE
geth attach http://localhost:30312


# EthStats

geth  --verbosity 3 --datadir /Users/rynthak/privateChain/alice --syncmode 'full' --port 30311 --rpc --rpcaddr 'localhost' --rpcport 30312 --rpcapi 'personal,db,eth,net,web3,txpool,miner, clique' --bootnodes 'enode://50f5941059466a663d7716dcd7c93751d7c301506a145a1a39f36420fd995fd0ca783b1d48ea9970d71063696749851a92891374136e19c0b68947348712aee3@127.0.0.1:30310' --networkid 20807 --gasprice '0' -unlock '0df654ca0dc48d9d3f1149d7311f04e1919bd31d' --password ~/pass2.txt --mine --rpccorsdomain "*" --nat "any" 

NODE_ENV=production INSTANCE_NAME=alice CONTACT_DETAILS=Mehdi RPC_HOST=localhost RPC_PORT=30312 WS_SERVER=http://localhost:3000 WS_SECRET=nirifa94 LISTENING_PORT=30311  node app.js
NODE_ENV=production INSTANCE_NAME=BOB CONTACT_DETAILS=Mehdi RPC_HOST=localhost RPC_PORT=30314 WS_SERVER=http://localhost:3000 WS_SECRET=nirifa94 LISTENING_PORT=30313  node app.js
NODE_ENV=production INSTANCE_NAME=Claudia CONTACT_DETAILS=Mehdi RPC_HOST=localhost RPC_PORT=30316 WS_SERVER=http://localhost:3000 WS_SECRET=nirifa94 LISTENING_PORT=30315  node app.js



#MIST
mist --rpc  http://52.143.167.179:8545


#Noeud Görli
geth --datadir /home/rynthak/goerli/mehdi  --port 30311 --syncmode 'full' --rpc  --rpcaddr 0.0.0.0 --rpccorsdomain “*”   --rpcport 8546 --rpcapi 'db,eth,net,web3,personal,web3' --bootnodes 'enode://c1f8b7c2ac4453271fa07d8e9ecf9a2e8285aa0bd0c07df0131f47153306b0736fd3db8924e7a9bf0bed6b1d8d4f87362a71b033dc7c64547728d953e43e59b2@52.64.155.147:30303' --networkid 5 

geth attach http://52.143.167.179:8546

geth  --datadir /home/rynthak/goerli/mehdi --nat "any" --syncmode 'fast' --rpc  --rpcaddr 0.0.0.0 --rpccorsdomain “*”   --rpcport 8546 --rpcapi 'db,eth,net,web3,personal,web3' --bootnodes 'enode://176b9417f511d05b6b2cf3e34b756cf0a7096b3094572a8f6ef4cdcb9d1f9d00683bf0f83347eebdf3b81c3521c2332086d9592802230bf528eaf606a1d9677b@13.93.54.137:30303' --networkid 5 

geth   --syncmode 'fast' --rpc  --rpcaddr 0.0.0.0    --rpcport 8546 --rpcapi 'db,eth,net,web3,personal,web3' --bootnodes 'enode://c1f8b7c2ac4453271fa07d8e9ecf9a2e8285aa0bd0c07df0131f47153306b0736fd3db8924e7a9bf0bed6b1d8d4f87362a71b033dc7c64547728d953e43e59b2@52.64.155.147:30303' --networkid 5 


geth  --datadir /home/rynthak/goerli/ --syncmode 'fast' --rpc  --rpcaddr 0.0.0.0     --rpcport 8546 --rpcapi 'db,eth,net,web3,personal,web3' --bootnodes 'enode://46add44b9f13965f7b9875ac6b85f016f341012d84f975377573800a863526f4da19ae2c620ec73d11591fa9510e992ecc03ad0751f53cc02f7c7ed6d55c7291@94.237.54.114:30313' --networkid 5 

wget https://raw.githubusercontent.com/goerli/testnet/master/geth/goerli.genesis

geth  --datadir data --syncmode 'fast' --rpc  --rpcaddr 0.0.0.0     --rpcport 8546 --rpcapi 'db,eth,net,web3,personal,web3' --bootnodes 'enode://46add44b9f13965f7b9875ac6b85f016f341012d84f975377573800a863526f4da19ae2c620ec73d11591fa9510e992ecc03ad0751f53cc02f7c7ed6d55c7291@94.237.54.114:30313' --networkid 5 

wget https://raw.githubusercontent.com/goerli/testnet/master/geth/goerli.genesis
geth -datadir data init goerli.genesis
geth  --datadir data --syncmode 'full' --rpc  --rpcaddr 0.0.0.0     --rpcport 8546 --rpcapi 'db,eth,net,web3,personal,web3' --bootnodes 'enode://176b9417f511d05b6b2cf3e34b756cf0a7096b3094572a8f6ef4cdcb9d1f9d00683bf0f83347eebdf3b81c3521c2332086d9592802230bf528eaf606a1d9677b@13.93.54.137:30303' --networkid 5 

geth attach http://52.143.167.179:8546
eth.getBalance('0xba5efca7724d335c139ac4bfb5a3498f2c6c2482')

