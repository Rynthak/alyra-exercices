function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
}
function timeConverter(UNIX_timestamp){
	  var d = new Date(0);
	  d.setUTCSeconds(UNIX_timestamp);	   
	  return d.toUTCString();
}
let dapp = null; 

let loader = $('<div class="loader mx-auto"></div>');

function addLoader(target){
	$(target).html(loader);
}

async function createMetaMaskDapp(functionToCall) {
	
	 try {
	   // Demande à MetaMask l'autorisation de se connecter
	   const addresses = await ethereum.enable();
	   const address = addresses[0]
	   // Connection au noeud fourni par l'objet web3
	   const provider = new ethers.providers.Web3Provider(ethereum);
	   dapp = { address, provider };
	  
	   $.each(functionToCall,function(index, value){
		  
		   value.name.apply(null,value.args);
	   })
	   
	   
	 } catch(err) {
	    
	   console.error(err);
	 }
}

