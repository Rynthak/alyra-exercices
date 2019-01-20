function fibonaci(month){
	return (month<=1)?month:(fibonaci(month - 1) + fibonaci(month - 2));
}

console.log(fibonaci(10));