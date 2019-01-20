


function reverseString(str) {
    var splitString = str.split(""); 
    var reverseArray = splitString.reverse(); 
    var joinArray = reverseArray.join("");
    return joinArray;
}


function isPalindrome(txt){
	
	var textLength= txt.length;
	var middle=Math.abs(textLength/2)+textLength%2;
	
	var start = txt.substr(0,middle);
	
	var end = txt.substr(middle-(textLength%2),middle);
	
	
	
	if(start==reverseString(end)){
		console.log("Youpi ! ->" +txt)
	}else{
		console.log(":( ->" +txt);
	}
	
	
}
isPalindrome("LOL");
isPalindrome("ANNNA");
isPalindrome("ALYRA");
isPalindrome("BOB");
isPalindrome("TOOOOOOOOT");

