/*
  contract Assemblee

*/

pragma solidity ^0.4.25;

contract Assemblee {
  Membre[] public membres;
  Decision[] public decisions;
  Admin[] public admins;
  string public nameAssemblee;

  constructor( string memory wName ) public {
    //  init admins & membres with first deploy member
    admins.push(Admin(msg.sender));
    rejoindre();
    nameAssemblee = wName;
  }

  // structure Administrateur
  struct Admin {
    address nameAdmin;
  }

  // structure Decision
  struct Decision {
    string description;
    uint votesPour;
    uint votesContre;
    // limit date for voting the Decision
    // uint endDate;
    mapping (address => bool) member2Vote;
  }

  //  structure Membre
  struct Membre {
    address nameMembre;
  }

  /***************************************************
    FUNCTIONS
  */

  // ctrl si un utilisateur est administrateur
  function estAdmin( address _user ) public view returns (bool) {
    for ( uint i = 0; i < admins.length; i++ ) {
      if ( admins[i].nameAdmin == _user ) {
        return true;
      }
    }
    return false;
  }

  // permet à un membre de rejoindre une assemblée
  function rejoindre() public {
    membres.push(Membre(msg.sender));
  }

  // effectue la différence des votes (pour, contre) pour une décision
  function comptabiliser( uint _index ) public view returns (int) {
      return (int(decisions[_index].votesPour) - int(decisions[_index].votesContre));
  }

  // vérification si un user est membre ou non
  function estMembre( address _user ) public view returns (bool) {
    for ( uint i = 0; i < membres.length; i++ ) {
      if ( membres[i].nameMembre == _user ) {
        return true;
      }
    }
    return false;
  }

  // return true if the member has already voted the decision (else return false)
  function hasVoted( address _user, uint _index ) public view returns (bool) {
    return decisions[_index].member2Vote[_user];
  }

  // seul un membre peut voter ... s'il ne l'a pas déjà fait!!!
  // ... si OK on augmente le vote (index dans decisions[]) Pour/ Contre suivant le sens
  function voter( uint _index, uint _sens ) public {
    require(estMembre(msg.sender), "You arenot a member yet! join before!");
    require(hasVoted(msg.sender, _index), "Vous ne pouvez pas voter 2 fois !");

    //  set the vote in decisions
    if (_sens == 1) {
      decisions[_index].votesPour += 1;
    } else {
      decisions[_index].votesContre += 1;
    }
    // init member2Vote for this decision
    decisions[_index].member2Vote[msg.sender] = true;
  }

  // proposition d'une décision par un membre
  function proposerDecision( string _description ) public {
    require(estMembre(msg.sender), "You arenot a member yet! ask admin to join before!");
    decisions.push(Decision(_description, 0, 0));
  }

  // fermeture d'une décision par un admin
  function enleverDecision( uint _index ) public {
    require(estAdmin(msg.sender), "You must be an Admin !!!");
    // la décision est enlevée de decisions[] ...
     delete decisions[_index];
  }

  // add an admin by first admin
  function addAdmin( address _user ) public {
    if ( admins[0].nameAdmin == msg.sender ) {
      admins.push(Admin(_user));
    }
  }

  // dismiss of an admin
  function dismissAdmin() public {
    // sender must be an admin and admins[].length must be at least 2
    require(estAdmin(msg.sender), "You must be an Admin !!!");
    require(admins.length == 1, "You must add someone before dismiss ...");
    for ( uint i = 0; i < admins.length; i++ ) {
      if (admins[i].nameAdmin == msg.sender) {
        delete admins[i];
      }
    }
  }

}