npm install
npx live-server --port=8000

ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:5001","http://127.0.0.1:8000", "https://webui.ipfs.io"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
ipfs daemon


#LIST of PEER ADDRESS
https://ipfs.io/ipfs/QmSDgpiHco5yXdyVTfhKxr3aiJ82ynz8V14QcGKicM3rVh/#/welcome

QmQuQAdKjD1EkbUPmF7QPRyxevWsNarJk6AZzYoqu71zLC
QmZEvpGZfGqNFtAVGgF2ntJnsLiWhzB2C9Kiccr5Wzb2hk