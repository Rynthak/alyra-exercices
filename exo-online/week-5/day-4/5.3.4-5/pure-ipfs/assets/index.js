//const node = new Ipfs({repo:'ipfs-'+Math.random()});
const node = window.IpfsHttpClient('localhost',5001);
$(function() {
	
	$("#image_file").on('change',function(e){
		var file = e.target.files[0];
		  if (!file) {
		    return;
		  }
		  var reader = new FileReader();
		  reader.onloadend = function(e) {
			  
			  
		        node.add(node.types.Buffer.from(btoa(reader.result),"base64"), (err, result) => { // Upload buffer to IPFS
		          if(err) {
		            console.error(err)
		            return
		          }
		          let url = `https://ipfs.io/ipfs/${result[0].hash}`
		          console.log(`Url --> ${url}`)
		          let hash = result[0].hash;
		          notify("L'image a bien été uplaoder <br>"+url,"Info",'notice');
		          loadImageByHash(hash);
		          addImageToContract(hash);
		         
		        })
		    
		    
		    
		  };
		  reader.readAsBinaryString(file);
		   
	});
	 
 });
 
var loadImageByHash = function(hash){
	 
	
	
    node.cat(hash, function (err, file) {
	    if (err) {
	        throw err
	    }    
	    $('<img id="output" style="max-width: 330px; padding-top: 10px;" />')
	    .attr('src', "data:image/blob;base64," + file.toString("base64")).appendTo('#result');
		 
		 $('<br>').appendTo('#result');;
    });
} 

var getTenFirstImages = function(){
	let contratCards=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratCards.connect(dapp.provider.getSigner());
	
	let nbCards=await contratMarketPlace.nbCards();	
	
	for(let i = 0 ;i < nbCards && i<10;i++ ){
		let card=await contractWithSigner.cards(i);
		loadImageByHash(card);
	}	
}

var addImageToContract function(hash){
	let contratCards=new ethers.Contract(contractAddress, abiContract, dapp.provider);
	let contractWithSigner=contratCards.connect(dapp.provider.getSigner());
	let hashByte32 = ethers.utils.toUtf8Bytes(hash);
	contractWithSigner.addCard(hash);
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