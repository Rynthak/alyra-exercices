
//Ramdom Char


for (var i = 0; i <= 9; i++) {
  console.log("#"+i+" "+String.fromCharCode((Math.random()*(122-97+1)+97)))
}


//Prompt devinette.


var devinette =	Math.floor(Math.random()*(100-1+1)+1);

var ask	= true;
console.log(devinette);
var texteMessage	=	"Coucou devine le nombre";
var VeryHot=[1,2,3,4,5];
var Hot =[6,7,8,9,10];
while(ask){
	var response	=	prompt(texteMessage);

	if(devinette==response){
		alert("Bravo la réponse était : "+devinette)	
		break;
	}
	texteMessage=devinette<response?"C'est Moin":"C'est Plus";
	texteMessage=(VeryHot.indexOf(Math.abs(devinette-response))!=-1)?texteMessage+" C'est Très HOT":texteMessage;
	texteMessage=(Hot.indexOf(Math.abs(devinette-response))!=-1)?texteMessage+" C'est HOT":texteMessage;
}


//Devine ordi

var devinette = prompt("Choisis un nombre entre 1 et 100");




