$(function() {
	
	contractAddress = $('body').data('contractaddress');
	abiContract =$('body').data('abicontract');
	
	// On form submit, handle the file uploads.
	$("[data-rel='add-charipfs']").on('submit', function (event) {
	    event.preventDefault();
 
	    var formData = new FormData($(this)[0]);
	    $.ajax({
	        url:  $(this).attr("action"),
	        type: 'POST',
	        data: formData,
	       
	        success: function (data) {
	           if(data.hash){
	        	   let url = `https://ipfs.io/ipfs/${data.hash}`
	        	   
	        	   //On call Le contract pour paiement
	        	   let functionToCall=[];	
	        	   functionToCall.push({name:addImageToContract,args:[data.hashHex]});
	        	   createMetaMaskDapp(functionToCall);
	        	   
	           }else{
	        	   notify(data);
	        	   console.error(data)
	           }
	        },
	        cache: false,
	        contentType: false,
	        processData: false
	    });
	});
	 
	 
});

var contractAddress ='';
var abiContract ='';


var addImageToContract= async function(HashUrl){
	let contratPin=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratPin.connect(dapp.provider.getSigner());
	var hours = 1;
	//Can cahnge hours
	var duration = hours * 60 * 60;
	let weyAmount = ethers.utils.parseEther('0.1');
	let temp = await contractWithSigner.payerStockage(HashUrl,duration,{value:weyAmount});
	
	
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


 function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
}