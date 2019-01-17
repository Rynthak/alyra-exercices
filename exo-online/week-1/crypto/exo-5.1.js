 

var loadJS = function(url, implementationCode, location){   
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
var calcBitcoinAdsr = function(){
	var array = new Uint32Array(1);
	
	let ramdomA = window.crypto.getRandomValues(array);
	let ramdom=ramdomA[0].toString();
	let SHA256=CryptoJS.SHA256(ramdom);
	let RIPEMD160=CryptoJS.RIPEMD160(ramdom);
	
	 
	//SHA256 de ramdom
	console.log(SHA256.toString()+" = SHA256 ("+ramdom+")");
	console.log(RIPEMD160.toString()+" = RIPEMD160 ("+ramdom+")");
	
	
}
loadJS('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js', calcBitcoinAdsr, document.body);



