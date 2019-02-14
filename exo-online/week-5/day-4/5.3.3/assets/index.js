//const node = new Ipfs({repo:'ipfs-'+Math.random()});
const node = window.IpfsHttpClient('localhost',5001);
$(function() {
	
	$(document).on('submit','[data-rel="add-charipfs"]',function(e){
		 e.preventDefault();
		 let txt=$("#name").val().trim();
		 if(txt==""){
			notify("Veuillez préciser la chaine");
				return false;
			}
		 addText(txt);
		 return false;
	 });
	 
	 
 });
var addText =  function(txt){
	 node.add(new node.types.Buffer.from(txt.toString()),(err, result) =>{
		 if(err){
			 console.error('erreur  - IPFS add',err,result);
			 
			 return false;
		 }
		 notify("La chaine "+txt+' a été ajouté',"Info",'notice');
		 let hash =result[0].hash
		 console.log(hash);
		 notify("Voici le hash :"+hash+'',"Info",'notice');
		 let link = $('<a>',
				 {text:'https://ipfs.io/ipfs/'+hash,
			 	  href:'https://ipfs.io/ipfs/'+hash,
			 	  target:'_blank'}).appendTo('#result');
		 
		 $('<br>').appendTo('#result');
	 });
}
 
 function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
}