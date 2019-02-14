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
	    $("#output").attr('src', "data:image/blob;base64," + file.toString("base64"));
    });
} 


 function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
}