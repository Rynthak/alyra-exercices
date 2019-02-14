//const node = new Ipfs({repo:'ipfs-'+Math.random()});
const node = window.IpfsHttpClient('localhost',5001);
$(function() {
	
	 $(document).on('submit','[data-rel="ping-pfs"]',function(e){
		 e.preventDefault();
		 let txt=$("#name").val().trim();
		 if(txt==""){
		 	notify("Veuillez préciser l'identifiant du noeud à ping");
			return false;
		}
		 ping(txt);
		 return false;
	 });
	 
	 
 });
var ping =  function(txt){
	 
	node.ping(txt,(err, result) =>{
		 if(err){
			 console.error('erreur  - IPFS add',err,result);
			 notify(err);
			 return false;
		 }
		 
		 console.log(result);
		  
	 });
}
 
 function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
}