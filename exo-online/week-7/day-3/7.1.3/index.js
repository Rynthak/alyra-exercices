var request = require('sync-request');

function makeRequest(url){
	var res = request('GET', url);
	return  JSON.parse(res.body.toString('utf-8'));
}
var token = process.argv.slice(2);

var data={};

var url =  'https://data.messari.io/api/v1/assets/'+token+'/metrics';

var result = makeRequest(url);

var nb2050 = result.data.supply.y_2050;
var circulating = result.data.supply.circulating;

data.percCirculating=((circulating/nb2050)*100) +' %';
data.all_time_high=result.data.all_time_high.price;
data.actual_value=result.data.market_data.price_usd;
data.compare=data.actual_value +((data.all_time_high>data.actual_value)?' < ':' > ')+data.all_time_high;
console.table(data);