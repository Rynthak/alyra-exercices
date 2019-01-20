let stack = "suis je Bonjour AFFICHE pile une rien SUPPRIME AFFICHE";


function pile(stack){

	let tab =[];
	for(let testVar of stack.split(" ")){
		
		switch(testVar){
			case "AFFICHE":
				let log="";
				while(tab.length>0){
					log=log+" "+tab.pop();;
				}
				console.log(log);
			break;
			
			case "SUPPRIME":
				tab.pop();
			break;
				
			default:
				tab.push(testVar);
			break;
		
		}
		
	}
	return ;
}

pile(stack);