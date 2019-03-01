var request = require('sync-request');

function makeRequest(url){
	var res = request('GET', url);
	return  JSON.parse(res.body.toString('utf-8'));
}
 

var symbol = process.argv.slice(2);

var url =  'https://api.bitfinex.com/v1/pubticker/'+symbol

var result = makeRequest(url);

console.table(result);