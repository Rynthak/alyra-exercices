 

var loadJS = function(url, implementationCode, location){   
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
function CourbeElliptique(a,b){
	this.a= a;
	this.b= b;
	if(4*Math.pow(a,3)+27*Math.pow(b,2)==0){
		throw new Error('({'+a+'}, {'+b+'}) n\'est pas une courbe valide');
	}
	
	this.testPoint = function(x,y){
		if(Math.pow(y,2)==Math.pow(x,3)+this.a*x-b){
			console.log("Les points {"+x+","+y+") sont sur la courbe !");
			return true;
		}
		console.log("Les points {"+x+","+y+") sont sur la courbe !");
		return false
	}
	
	this.__eq__ = function (Courbe){
		return this.a==Courbe.a && this.b==Courbe.b;
	}
	
	this.toString = function(){
		return "Paramètres Courbe : a = "+ this.a+ " ; b = "+ this.b;
	}
	
	return this;
}


var CalcElyptique = function (){
	
};

function calcG(){
	this.a= a;
	this.b= b;
	if(4*Math.pow(a,3)+27*Math.pow(b,2)==0){
		throw new Error('({'+a+'}, {'+b+'}) n\'est pas une courbe valide');
	}
	
	this.testPoint = function(x,y){
		if(Math.pow(y,2)==Math.pow(x,3)+this.a*x-b){
			console.log("Les points {"+x+","+y+") sont sur la courbe !");
			return true;
		}
		console.log("Les points {"+x+","+y+") sont sur la courbe !");
		return false
	}
	
	this.returnPoint = function(point){
		
	}
	
	
	return this;
}

var calcBitcoinAdsr = function(){
	var array = new Uint32Array(1);
	
	let ramdomA = window.crypto.getRandomValues(array);
	 
	let privateKey=ramdomA[0].toString();
	
	//Calcul de la clé privés
	let SHA256=CryptoJS.SHA256(privateKey);	
	
	//Calcul en courbe elyptique
	
	let test = new calcG(0,7);
	
	test=()
	//let K =SHA256.toSring()* G; 
	 
	
	
	let RIPEMD160=CryptoJS.RIPEMD160(ramdom.toString());
	console.log(RIPEMD160.toString())
	
	
	
	//
	
}
loadJS('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js', calcBitcoinAdsr, document.body);



