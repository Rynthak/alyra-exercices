function isPalindromeRecursive(str){
	
	var length=str.length;
	
	if(length <=1){
		console.log("Houra");
		return true;
	}
	
	var end=length-1;
	
	
	if(str.charAt(0)==str.charAt(end)){
		var newStar = str.slice(1,length-2);
		return isPalindromeRecursive(newStar);
		
	}
	return false;	
	
	
}


isPalindromeRecursive("BOB");
