#Défi #3 : Service d’épinglage de fichiers décentralisés
 




npm install<br>





geth  --testnet --syncmode 'fast' --rpc  --rpcaddr 0.0.0.0 --rpcport 8545 --rpcapi 'db,eth,net,web3,personal,web3' --bootnodes "enode://6332792c4a00e3e4ee0926ed89e0d27ef985424d97b6a45bf0f23e51f0dcb5e66b875777506458aea7af6f9e4ffb69f43f3778ee73c81ed9d34c51c4b16b0b0f@52.232.243.152:30303,enode://94c15d1b9e2fe7ce56e458b9a3b672ef11894ddedd0c6f247e0f1d3487f52b66208fb4aeb8179fce6e3a749ea93ed147c37976d67af557508d199d9594c35f09@192.81.208.223:30303" 

 
nohup geth  --datadir data --testnet --syncmode 'fast' --rpc  --rpcaddr 0.0.0.0 --rpcport 8546 --rpcapi 'db,eth,net,web3,personal,web3' >> geth.log &