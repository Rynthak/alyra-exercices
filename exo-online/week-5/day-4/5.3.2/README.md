npm install<br>
npx live-server --port=8000<br>

ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001<br>
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:5001","http://127.0.0.1:8000", "https://webui.ipfs.io"]'<br>
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'<br>
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'<br>
ipfs daemon<br>

<br>
#LIST of PEER ADDRESS<br>
https://ipfs.io/ipfs/QmSDgpiHco5yXdyVTfhKxr3aiJ82ynz8V14QcGKicM3rVh/#/welcome<br>
<br>
QmQuQAdKjD1EkbUPmF7QPRyxevWsNarJk6AZzYoqu71zLC<br>
QmZEvpGZfGqNFtAVGgF2ntJnsLiWhzB2C9Kiccr5Wzb2hk<br>