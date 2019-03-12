
pragma solidity ^0.5.3;


contract CanalDePaiement {
	
	enum EtatCanal { VIDE, ACTIF, ENCOURSFERMETURE, FERME}
	
	address partieA;
	address partieB;
	uint montant;
	EtatCanal etat;
	uint blocFermeture; 
	uint dernierNonce;
	uint equilibreA;
	uint equilibreB;
	
	
	constructor(address _partieA,address _partieB , uint _montant) public {
		partieA	=_partieA;
		partieB	=_partieB;
		montant	= _montant;
		etat = EtatCanal.VIDE;
    }
	
}