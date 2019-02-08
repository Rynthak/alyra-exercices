library SharedStructs {
	enum StatusChoice { OUVERTE, ENCOURS, FERMEE }
    struct Demande {
        uint256 remuneration;
        uint256 accept_delay;
        string description;
        StatusChoice status;
        
    }    
}