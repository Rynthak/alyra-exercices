library SharedStructs {
	enum StatusChoice { OUVERTE, ENCOURS, FERMEE };
	enum StatusIllustratorChoice { ACCEPTE, BAN};
    struct Demande {
        uint256 remuneration;
        uint256 accept_delay;
        string description;
        StatusChoice status = 0;
        uint256 minimumReput = 1;
        address[] candidats;
    }
    
    struct Entreprise{
    	 string name;
    	 address entreprise_address;
    	 mapping (address => Demande[]) private demandes;
    }
    
    struct Illustrator{
    	 string name;
    	 address illustrator_address;
    	 uint256 reputation ;
    	 StatusIllustratorChoice status = 0;
    }    
}