var request = require('sync-request');
tablebitmex =[];
tablebitfinex =[];
 

function makeRequest(url){
	var res = request('GET', url);
	return  JSON.parse(res.body.toString('utf-8'));
}


tablebitmex = makeRequest('https://www.bitmex.com/api/v1/orderBook/L2?symbol=XBT&depth=100');
tablebitfinex =makeRequest('https://api.bitfinex.com/v1/book/btcusd?limit_bids=100&limit_asks=100');


function calcBestDeal(amount){
	
}

console.log(tablebitmex,tablebitfinex);


