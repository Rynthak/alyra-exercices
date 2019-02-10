 $(function() {
    
	$('#theModal').on('show.bs.modal', function (e) {
	    var button = $(e.relatedTarget);
	    var modal = $(this);    
	    modal.find('.modal-dialog').load(button.data("remote"));
	});
	
    
	$('[data-rel="connect"]').click(function(){
		
	});
	
	
	
	
	$(document).on('submit','[data-rel="register-form"]',function(e){
		e.preventDefault();
		
		
		
		
		//Création de l'entreprise ou de l'illustrateur
		
		let nameAccount=$("#name").val().trim();
		let typeAccount=$("#type_account").val();
		
		if(nameAccount==""){
			notify("Veuillez préciser votre nom");
			return false;
		}
		if(typeAccount==""){
			notify("Veuillez préciser un type de compte");
			return false;
		}
		let functionToCall=[];		
		functionToCall.push({name:initRegister,args:[nameAccount,typeAccount]})
		createMetaMaskDapp(functionToCall);		
		return false;
		
	});
});

function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
} 
 
let initRegister = async function(nameAccount, typeAccount){
	
	//Init contract Market Place
	//console.log(dapp);return;
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	
	let myAccount = await contractWithSigner.getMyAccountEnterpise();
	 
	if(myAccount.entreprise_address.toLowerCase()==dapp.address.toLowerCase()){
		notify("Déjà inscrit");
		return false;
	}
	if(typeAccount=="0"){			
		let tx = await contractWithSigner.inscription(nameAccount);
	}else if(typeAccount=="1"){
		let tx = await contractWithSigner.inscriptionEntreprises(nameAccount);
	}
	
	
	myAccount = await contractWithSigner.getMyAccountEnterpise();	
	
	notify("Inscription OK","info",'notice');
}




let dapp = null; 

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