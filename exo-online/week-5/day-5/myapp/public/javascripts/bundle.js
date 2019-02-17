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
	 
	 let functionToCall=[];	
	 functionToCall.push({name:myPin,args:[]});
	 createMetaMaskDapp(functionToCall);
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
 var myPin =  function(){

	 var parameters = { address: dapp.address.toLowerCase() };
     $.get( '/ipfs/getmypin',parameters, function(data) {
    	 if(data.length>0){
    		 $('<h1>My Pins</h1><br>').appendTo('#result');
    	 }
    	 for(var i in data){
    		  
    		 let link = $('<a>',
    				 {text:'https://ipfs.io/ipfs/'+data[i].hash,
    			 	  href:'https://ipfs.io/ipfs/'+data[i].hash,
    			 	  target:'_blank'}).appendTo('#result');
    		 $('<div id="count-'+i+data[i].hash+'">').appendTo('#result');
    		 if(data[i].expired==false){
	    		 $("#count-"+i+data[i].hash)
	    		  .countdown(data[i].duration*1000, function(event) {
	    		    $(this).text(
	    		      event.strftime('Expire dans %D days %H:%M:%S')
	    		    );
	    		  });
    	 	}else{
    	 		$("#count-"+i+data[i].hash).html('<span class="text-danger">Expiré</span>')
    	 	}
    		 $('<br>').appendTo('#result');
    	 }
    }).fail(function() {
        console.log( "fail get pin" );
    });
} 



