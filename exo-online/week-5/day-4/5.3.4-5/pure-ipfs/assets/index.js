//const node = new Ipfs({repo:'ipfs-'+Math.random()});
const node = window.IpfsHttpClient('localhost',5001);
$(function() {
	
	 
	 
 });
 
 
 function notify(message,title="Erreur",type="error"){
	$.growl({ title: title, message: message,style:type});
}