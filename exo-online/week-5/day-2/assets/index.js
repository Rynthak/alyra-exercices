const node = new Ipfs({repo:'ipfs-'+Math.random()});
$(function() {
	 
	
	 
        
	 node.on('ready', () => {
		 notify("Le noeud est prêt","Info",'notice');
	 })
	 
	 //const ipfs = window.IpfsApi('localhost',5001);
	 
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
 //Ajout du texte
 var addText =  function(txt){
	 node.add(new node.types.Buffer.from(txt.toString()),(err, result) =>{
		 if(err){
			 console.error('erreur  - IPFS add',err,result);
			 
			 return false;
		 }
		 notify("La chaine "+txt+' a été ajouté',"Info",'notice');
		 
		 console.log(result[0].hash);
		 notify("Voici le hash :"+result[0].hash+'',"Info",'notice');
	 });
 }
 
 function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
}