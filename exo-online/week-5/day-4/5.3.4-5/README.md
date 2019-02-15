#Exercice 5.3.4-5 -
#Exercice 5.3.4 - Créer un jeu de cartes à collectionner décentralisé
#Exercice 5.3.5 - Publication du jeu de cartes à collectionner décentralisé

CONTRACT ADDRESS ON ROPSTEN




npm install<br>
cd pure-ipfs
npx live-server --port=8000<br>





ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001<br>
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:5001","http://127.0.0.1:8000", "https://webui.ipfs.io","https://ipfs.io"]'<br>
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'<br>
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'<br>
ipfs daemon<br>


#PIN
ipfs add -r pure-ipfs
ipfs pin add -r QmZyRfpMffWNPJjT9YwyqFqF36zXqKDQCRSok2opMuuvZj
ipfs name publish QmZyRfpMffWNPJjT9YwyqFqF36zXqKDQCRSok2opMuuvZj

ipfs name resolve Qmd3cRSLrrskK3ZUZn4ZQFYHXSBkE4RgHzumUd2Tu1sfCk
 