
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

 
var Courbe = new CourbeElliptique (1,2)
var Courbe2 = new CourbeElliptique (1,2);



console.log(Courbe.testPoint(5,5));
console.log(Courbe.__eq__(Courbe2));

console.log(Courbe.toString());