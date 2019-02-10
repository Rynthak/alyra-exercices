 $(function() {
    
	$('#theModal').on('show.bs.modal', function (e) {
	    var button = $(e.relatedTarget);
	    var modal = $(this);    
	    modal.find('.modal-dialog').load(button.data("remote"));
	});
	
	loginContract();
	$('[data-rel="connect"]').click(function(){
		
	});
	
	$(document).on('refreshDemande',function(e){
		
		e.preventDefault();
		let functionToCall=[];	
		functionToCall.push({name:listDemande,args:[]});
		createMetaMaskDapp(functionToCall);		
		
		return false;
		
	});
	$( document ).trigger( "refreshDemande");
	
	
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

let listDemande = async function(){
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	
	
	//On récupérère la list des demande
	let elementContainerTable = $('[data-rel="container-table-demande"]');
	let remoteUrl = elementContainerTable.data('remote');
	let table=$(await $.ajax( remoteUrl));
			
	let nbDemande=await contratMarketPlace.nbDemandes();
	
	
	for(let i = 0 ; i< nbDemande.toString();i++){
		//Création 
		
		let contratDemandeAddress=await contratMarketPlace.demandes(i);
		
		let contratDemande=new ethers.Contract(contratDemandeAddress, abiContractDemande, dapp.provider);
		
		let remuneration = await contratDemande.remuneration();
		let date_project_end = timeConverter(await contratDemande.accept_delay());
		let description = await contratDemande.description();
		let reputation = await contratDemande.minimumReput();
		let status=  await contratDemande.status();
		let tempRow="";
		
		let statusHTML='<span class="badge badge-success">OUVERT</span>';
		statusHTML=(status==1)?'<span class="badge badge-warning">EN COURS</span>':statusHTML;
		statusHTML=(status==2)?'<span class="badge badge-danger">FERMEE</span>':statusHTML;
		
		
		
		
		let buttonList="";
		 
		
		buttonList+='<div class="dropdown">';
		buttonList+='<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
		buttonList+='Action';
		buttonList+='</button>';
		buttonList+='<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
			
			if(status==0){
				buttonList+='<a class="dropdown-item" href="#">Postuler</a>';
			}
			if(status==1){
				buttonList+='<a class="dropdown-item" href="#">Remettre un travail</a>';
			}
			if(status==0){ 
				buttonList+='<a class="dropdown-item" href="#">Choisir un candidat</a>';
			}
			if(status==2){
				buttonList+='<a class="dropdown-item" href="#">Récupérer travail</a>';
			}
		buttonList+='</div>';
		buttonList+='</div>';
		
		
		
		
		tempRow+='<tr>'
		tempRow+='<th scope="row">'+(i+1)+'</th>';
		tempRow+='<td>'+statusHTML+'</td>';
		tempRow+='<td>'+ethers.utils.formatEther(remuneration)+' ethers</td>';
		tempRow+='<td>'+date_project_end+'</td>';
		tempRow+='<td>'+reputation+'</td>';
		tempRow+='<td>'+description+'</td>';
		tempRow+='<td>'+buttonList+'</td>';
		tempRow+='</tr>';
	
		table.find("#body_table_demande").append(tempRow);
	}
	elementContainerTable.html(table);	
	
}
let loginContract =  async function(){	
	
	
	let _initConnect= async function(){
		let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
		let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
		let myAccount = await contractWithSigner.getMyAccountEnterpise();
		if(myAccount.entreprise_address.toLowerCase()!=dapp.address.toLowerCase()){
			localStorage.setItem('type_account', 'entreprise');
			localStorage.setItem('name', myAccount.name);
		}
		/*myAccount = await contractWithSigner.getMyAccountIllustrator();
		if(myAccount.illustrator_address.toLowerCase()!=dapp.address.toLowerCase()){
			localStorage.setItem('type_account', 'illustrator');
			localStorage.setItem('name', myAccount.Name);			
		}	*/	
		return false;
		
	};
	let functionToCall = [];
	functionToCall.push({name:_initConnect,args:[]});
	createMetaMaskDapp(functionToCall);
	
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
	
	$( document ).trigger( "refreshDemande");
	
};

 
let initRegister = async function(nameAccount, typeAccount){
	
	//Init contract Market Place
	//console.log(dapp);return;
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	
	let myAccount = await contractWithSigner.getMyAccountEnterpise();
	 
	if(myAccount.entreprise_address.toLowerCase()==dapp.address.toLowerCase()){
		notify("Déjà inscrit en tant qu'entreprise");
		$('#theModal').modal('hide');
		return false;
	}
	myAccount = await contractWithSigner.getMyAccountIllustrator();
	if(myAccount.illustrator_address.toLowerCase()==dapp.address.toLowerCase()){
		notify("Déjà inscrit en tant qu'illustrateur");
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

function timeConverter(UNIX_timestamp){
	  var d = new Date(0);
	  d.setUTCSeconds(UNIX_timestamp);	   
	  return d.toUTCString();
}
