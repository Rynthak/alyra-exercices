
#ALICE

geth --datadir /Users/rynthak/privateChain/alice --syncmode 'full' --port 30311 --rpc --rpcaddr 'localhost' --rpcport 30312 --rpcapi 'personal,db,eth,net,web3,txpool,miner, clique' --bootnodes 'enode://50f5941059466a663d7716dcd7c93751d7c301506a145a1a39f36420fd995fd0ca783b1d48ea9970d71063696749851a92891374136e19c0b68947348712aee3@127.0.0.1:30310' --networkid 20807 --gasprice '0' -unlock '0df654ca0dc48d9d3f1149d7311f04e1919bd31d' --password ~/pass2.txt --mine 



#BOB

geth --datadir /Users/rynthak/privateChain/bob --syncmode 'full' --port 30313 --rpc --rpcaddr 'localhost' --rpcport 30314 --rpcapi 'personal,db,eth,net,web3,txpool,miner, clique' --bootnodes 'enode://50f5941059466a663d7716dcd7c93751d7c301506a145a1a39f36420fd995fd0ca783b1d48ea9970d71063696749851a92891374136e19c0b68947348712aee3@127.0.0.1:30310' --networkid 20807 --gasprice '0' -unlock 'fbd003210885eb2e8513bff76f0b56353d89678d' --password ~/pass.txt --mine 


#Claudia

geth --datadir /Users/rynthak/privateChain/claudia --syncmode 'full' --port 30315 --rpc --rpcaddr 'localhost' --rpcport 30316 --rpcapi 'personal,db,eth,net,web3,txpool,miner, clique' --bootnodes 'enode://50f5941059466a663d7716dcd7c93751d7c301506a145a1a39f36420fd995fd0ca783b1d48ea9970d71063696749851a92891374136e19c0b68947348712aee3@127.0.0.1:30310' --networkid 20807 --gasprice '0' -unlock '675eaecc352002d6f9a3fa25241ea3f2937185cf' --password ~/pass.txt --mine 
