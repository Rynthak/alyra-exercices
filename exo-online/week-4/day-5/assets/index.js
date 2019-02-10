 $(function() {
    
	$('#theModal').on('show.bs.modal', function (e) {
	    var button = $(e.relatedTarget);
	    var modal = $(this);    
	    modal.find('.modal-dialog').load(button.data("remote"));
	});
	
    
	$('[data-rel="connect"]').click(function(){
		
	});
	
	//gestion du paiement
	$(document).on('submit','[data-rel="add-demande-form"]',function(e){
		e.preventDefault();
		let description=$("#description").val().trim();
		
		let remuneration=$("#remuneration").val().trim();
		let date_project=$("#date_project").val().trim();
		let reputation=$("#reputation").val().trim();
		 
		
		if(description==""){
			notify("Veuillez préciser une description");
			return false;
		}
		if(remuneration==""){
			notify("Veuillez préciser une remuneration");
			return false;
		}
		if(reputation==""){
			notify("Veuillez préciser une reputation minimum");
			return false;
		}
		if(date_project==""){
			notify("Veuillez préciser une date limite d'acception");
			return false;
		}
		//Appel de l'insertion de la demande
		let functionToCall=[];		
		
		//Transformation des données
		let tempDate = new Date(date_project);
		date_project=Math.floor(tempDate.getTime()/1000);
		functionToCall.push({name:addDemande,args:[description, remuneration,reputation,date_project]})
		createMetaMaskDapp(functionToCall);		
		
		return false;
		
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

let addDemande =  async function(description, remuneration,minimumReput,accept_delay){
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	
	let myAccount = await contractWithSigner.getMyAccountEnterpise();
	 
	if(myAccount.entreprise_address.toLowerCase()!=dapp.address.toLowerCase()){
		notify("Vous devez vous connecter");
		return false;
	}
	let etherAmount = (remuneration  * 1.02); 
	let weyAmount = ethers.utils.parseEther(etherAmount.toString());
	
	remuneration=ethers.utils.parseEther(remuneration.toString());
	let tx = await contractWithSigner.ajouterDemande(remuneration.toString(10),accept_delay,description,minimumReput,{value:weyAmount});
	
	
	
	//let listOffers = await contractWithSigner.listsOffers() ;
	
	//console.log(listOffers);
	
	notify("Votre demande a été ajouté",'info','notice');
	$('#theModal').modal('hide');
	
};

 
let initRegister = async function(nameAccount, typeAccount){
	
	//Init contract Market Place
	//console.log(dapp);return;
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	
	let myAccount = await contractWithSigner.getMyAccountEnterpise();
	 
	if(myAccount.entreprise_address.toLowerCase()==dapp.address.toLowerCase()){
		notify("Déjà inscrit");
		$('#theModal').modal('hide');
		return false;
	}
	if(typeAccount=="0"){			
		let tx = await contractWithSigner.inscription(nameAccount);
	}else if(typeAccount=="1"){
		let tx = await contractWithSigner.inscriptionEntreprises(nameAccount);
	}
	
	
	myAccount = await contractWithSigner.getMyAccountEnterpise();	
	
	notify("Inscription OK","info",'notice');
	$('#theModal').modal('hide');
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