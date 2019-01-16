let aTabCombi =[];

//Initialisation du tableau de transaction
let aTab	=	[];
//Initialisation taille max du bloc
let maxSize	=	6000;

//Initialisation variable maximum de tips dans l'ensemble des combinaisons générées
 
let transacCombinaison = {maxTips: 0, table:""};

console.log(transacCombinaison);
aTab.push({"size": 2000,"tips": 13000});
aTab.push({"size": 6000,"tips": 9000});
aTab.push({"size": 800,"tips": 2000});
aTab.push({"size": 700,"tips": 1500});
aTab.push({"size": 1200,"tips": 3500});
aTab.push({"size": 1000,"tips": 2800});
aTab.push({"size": 1300,"tips": 5000});
aTab.push({"size": 600,"tips": 1500});

//Calcul du combinatoire de tableau avec prise en compte du nom dépassement de la taille du bloc
 
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
    if(set.blocksize<=maxSize && transacCombinaison.maxTips<=set.tips){
    	transacCombinaison.table=set;
    	transacCombinaison.maxTips=set.tips;
    }
}
console.log("Nombre max de tips: "+transacCombinaison.maxTips);
console.log("Compléxité de l'ago 2 exp "+aTab.length+" soit "+Math.pow(2, aTab.length))
console.table(transacCombinaison.table); 

console.log("Une autre méthode plus tactique consiste à trier le tableau de transaction dans l'ordre croissant selon le rapport de rentabilité size/tips .")
console.log("Puis on parcourt le tableau jusqu'à que la taille du bloc soit atteinte ");


