let aTabCombi =[];

//Initialisation du tableau de transaction
let aTab	=	[];
//Initialisation taille max du bloc
let maxSize	=	6000;

aTab.push({"size": 2000,"tips": 13000});
aTab.push({"size": 6000,"tips": 9000});
aTab.push({"size": 800,"tips": 2000});
aTab.push({"size": 700,"tips": 1500});
aTab.push({"size": 1200,"tips": 3500});
aTab.push({"size": 1000,"tips": 2800});
aTab.push({"size": 1300,"tips": 5000});
aTab.push({"size": 600,"tips": 1500});

//Calcul du combinatoire de tableau avec prise en compte du nom dépassement de la taille du bloc
var res = [];
for (let i = 0; i < Math.pow(2, aTab.length); i++) {
	let bin = (i).toString(2), set = [];
    bin = new Array((aTab.length-bin.length)+1).join("0")+bin;
    set.blocksize=0;
    set.tips=0;
    for (let j = 0; j < bin.length; j++) {
        if (bin[j] === "1") {
            set.push(aTab[j]);
            set.blocksize+=aTab[j].size;
            set.tips+=aTab[j].tips;
        }
    }
    //On affecte la combinaison si la somme des bloc des transactions est inférieur à la somme du bloc total
    if(set.blocksize<=maxSize){
    	res.push(set);
    }
}

//On cherche le maximum de tips dans l'ensemble des combinaisons générées
let maxTips=0;
let transacCombinaison=null;

for(let i =0;i < res.length;i++){
	if(res[i].tips >= maxTips){
		maxTips=res[i].tips;
		transacCombinaison=res[i];
	}
}
console.log("Nombre max de tips: "+maxTips);
console.table(transacCombinaison); 
