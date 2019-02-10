 $(function() {
	 
	
	
	$('#theModal').on('show.bs.modal', function (e) {
	    var button = $(e.relatedTarget);
	    var modal = $(this);    
	    modal.find('.modal-dialog').load(button.data("remote"));
	});	
	
	$(document).on('refreshDemande',function(e){
		
		e.preventDefault();
		addLoader('[data-rel="container-table-demande"]');
		let functionToCall=[];	
		functionToCall.push({name:listDemande,args:[]});
		createMetaMaskDapp(functionToCall);		
		return false;
		
	});
	//Tableau des demandes
	$( document ).trigger( "refreshDemande");
	
	
	
	//Ajout d'une demande
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
	
	
	//Gestion de la demande d'ajout à la liste des candidats d'une demande
	$(document).on('click','[data-rel="postul"]',function(e){
		
		
		
		
		
		
		
	});	
	
	//Formulaire d'enregistrement
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

let initPostuler = async function (){
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	
	let nbDemande=await contratMarketPlace.nbDemandes();
	
	
	notify("Votre demande de candidateur a été ajouté",'info','notice');		 	
	$( document ).trigger( "refreshDemande");
} 
 
 
//Gestion des evenement de contract
let  initContractEvent = async function (){
	 
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
		//let statusIsIllustrator=  await contratDemande.isMyIllustrator(dapp.address);
		let checkPostuled = await contratDemande.checkPostuled(dapp.address);
		
		
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
				buttonList+='<a class="dropdown-item" data-rel="postul" data-index="'+i+'" href="#">Postuler</a>';
			}
			if(status==1){
				buttonList+='<a class="dropdown-item" href="#">Remettre un travail</a>';
			}
			if(status==0){ 
				buttonList+='<a class="dropdown-item"  href="javascript:void(0);">Choisir un candidat</a>';
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
	let tx= undefined;
	if(typeAccount=="0"){			
		tx = await contractWithSigner.inscription(nameAccount);
	}else if(typeAccount=="1"){
		tx = await contractWithSigner.inscriptionEntreprises(nameAccount);
	}	 
	
	notify("Inscription OK","info",'notice');
	$('#theModal').modal('hide');
}


