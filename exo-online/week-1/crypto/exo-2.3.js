/*
 * Entrainement 2.3
Écrire une fonction qui prend un texte en entrée et un nombre n, retire les espaces et le regroupe les caractères tous les n:

regroupement (“Mes vieilles tantes”, 3) ￫ [“MVIAE”,EILSNS”,”SELTT”]
 * 
 */

function regroupement(txt,group){
	let replaceSpace=txt.replace(/ /g, "");
	let tabRegroup =[];
	
	for(let i =0;i<group;i++){
		tabRegroup[i]="";
		for(j=i;j<replaceSpace.length;j+=group){
			tabRegroup[i]=tabRegroup[i]+replaceSpace.charAt(j);
		}		
	}
	console.log(tabRegroup);	 
}

regroupement ("Mes vieilles tantes", 3);