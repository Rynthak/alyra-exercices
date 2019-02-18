 $(function() {
	 
	
	loginContract();
	$('#theModal').on('show.bs.modal', function (e) {
	    var button = $(e.relatedTarget);
	    var modal = $(this);    
	    modal.find('.modal-dialog').load(button.data("remote"));
	    
	    
	    if(button.data("callback")){
	    	eval(button.data("callback")).apply(null,button.data('args'));
	    }
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
		e.preventDefault();	
		let functionToCall=[];	 
		let offerIndex = $(this).data("index");
		functionToCall.push({name:initPostuler,args:[offerIndex]})
		createMetaMaskDapp(functionToCall);		
		return false;		
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

let initListCandidateChoice = function(index){
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	notify("Veuillez choisir un candidat en selectionnant son addresse",'info','notice');
	
}
 
let initPostuler = async function (offerIndex){
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	 
	
	let tx = await contractWithSigner.postuler(offerIndex);
	
	
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
			
	let nbDemande=await contractWithSigner.nbDemandes();
	
	if(nbDemande==0){
		table='<div class="alert alert-warning mx-auto" role="alert">';
		table+="Aucune demande pour l'instant";
		table+='</div>';
	}
	
	for(let i = 0 ; i< nbDemande.toString();i++){
		//Création 
		
		let demande=await contractWithSigner.demandes(i);
		
		 console.log(demande);
		
		let remuneration = demande.remuneration;
		let date_project_end = timeConverter( demande.accept_delay);
		let description = demande.description;
		let reputation =demande.minimumReput;
		let status=  demande.status;
		//let statusIsIllustrator=  await contratDemande.isMyIllustrator(dapp.address);
		let checkPostuled =  await contractWithSigner.postuled(i,dapp.address);
		let customer = await contractWithSigner.entreprisesDemandes(i);
		let isCustomer =customer.toLowerCase()==dapp.address.toLowerCase();
		 
		
		
		let tempRow="";
		
		let statusHTML='<span class="badge badge-success">OUVERT</span>';
		statusHTML=(status==1)?'<span class="badge badge-warning">EN COURS</span>':statusHTML;
		statusHTML=(status==2)?'<span class="badge badge-danger">FERMEE</span>':statusHTML;
		
		if(isCustomer){
			statusHTML+='<br><span class="badge badge-primary">MY DEMANDE</span>';
		}
		
		if(status==0  && localStorage.getItem('type_account')=='1'){
			if(checkPostuled){
				statusHTML+='<br><span class="badge badge-success">POSTULE</span>';
			}else{
				statusHTML+='<br><span class="badge badge-warning">NON POSTULE</span>';
			}
		}
		
		
		let buttonList="";
		 
		
		buttonList+='<div class="dropdown">';
		buttonList+='<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
		buttonList+='Action';
		buttonList+='</button>';
		buttonList+='<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
			
			if(status==0 && !checkPostuled && localStorage.getItem('type_account')=='1'){
				buttonList+='<a class="dropdown-item" data-rel="postul" data-index="'+i+'" href="javascript:void(0);">Postuler</a>';
			}
			if(status==0 && isCustomer){ 
				buttonList+='<a class="dropdown-item"  data-remote="/accept_illustrator.html" data-callback="initListCandidateChoice" data-args="['+i+']" data-toggle="modal" data-target="#theModal">Choisir un candidat</a>';
			}
			if(status==1){
				buttonList+='<a class="dropdown-item"  data-rel="add_dev" data-index="'+i+'" href="javascript:void(0);">Remettre un travail</a>';
			}			
			if(status==2){
				buttonList+='<a class="dropdown-item" data-rel="get_dev" data-index="'+i+'" href="javascript:void(0);">Récupérer travail</a>';
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
		let myAccount = await contractWithSigner.accountList(dapp.address.toLowerCase());		
		if(myAccount.account_address.toLowerCase()==dapp.address.toLowerCase()){
			localStorage.setItem('type_account', myAccount.role);
			localStorage.setItem('name', myAccount.name);
		}		 	
		return false;
		
	};
	let functionToCall = [];
	functionToCall.push({name:_initConnect,args:[]});
	createMetaMaskDapp(functionToCall);
	
}


let addDemande =  async function(description, remuneration,minimumReput,accept_delay){
	let contratMarketPlace=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratMarketPlace.connect(dapp.provider.getSigner());
	
	let myAccount = await contractWithSigner.accountList(dapp.address.toLowerCase());
	 
	if(myAccount.account_address.toLowerCase()!=dapp.address.toLowerCase() || myAccount.role=='1'){
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
	
	let myAccount = await contractWithSigner.accountList(dapp.address.toLowerCase());
	 
	if(myAccount.account_address.toLowerCase()==dapp.address.toLowerCase()){
		notify("Déjà inscrit ");
		$('#theModal').modal('hide');
		return false;
	}
	 
	let tx= await contractWithSigner.inscription(nameAccount,typeAccount);
	 
	
	notify("Inscription OK","info",'notice');
	$('#theModal').modal('hide');
}


