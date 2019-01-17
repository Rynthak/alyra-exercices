
function CourbeElliptique(a,b){
	this.a= a;
	this.b= b;
	if(4*Math.pow(a,3)+27*Math.pow(b,2)==0){
		throw new Error('({'+a+'}, {'+b+'}) n\'est pas une courbe valide');
	}
	return this;
}

 
var Courbe = new CourbeElliptique (1,2)

console.log(Courbe);