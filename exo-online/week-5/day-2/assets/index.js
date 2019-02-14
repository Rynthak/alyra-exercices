const node = new Ipfs({repo:'ipfs-'+Math.random()});
//const ipfs = window.IpfsApi('localhost',5001);
$(function() {
	 
	
	$("#image_file").on('change',function(e){
		var file = e.target.files[0];
		  if (!file) {
		    return;
		  }
		  var reader = new FileReader();
		  reader.onloadend = function(e) {
			  
			  const buf = buffer.Buffer(reader.result) // Convert data into buffer
		        node.add(buf, (err, result) => { // Upload buffer to IPFS
		          if(err) {
		            console.error(err)
		            return
		          }
		          let url = `https://ipfs.io/ipfs/${result[0].hash}`
		          console.log(`Url --> ${url}`)
		          
		          document.getElementById("output").src = url
		        })
		    
		    
		    
		  };
		  reader.readAsArrayBuffer(file);
		   
	})
	 
        
	 node.on('ready', () => {
		 notify("Le noeud est prêt","Info",'notice');
	 })
	 
	 
	 
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
	 
	 
	 $(document).on('submit','[data-rel="get-charipfs"]',function(e){
		 e.preventDefault();
		 let txt=$("#hash").val().trim();
		 if(txt==""){
			notify("Veuillez préciser le hash à récupérer");
				return false;
			}
		 getText(txt);
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
 
 var addImage =  function(data){
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
 
 var getText = function(txt){
	 node.cat(txt).then( result =>(
		 notify("La chaine est "+ result.toString(),"Info",'notice')
	 ));
 };
 
 
 function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
}