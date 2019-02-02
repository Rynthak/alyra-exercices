pragma solidity ^0.4.25;
contract Assemblee {
  address[] participants;
  string[] descriVotes;
  uint[] votesPour;
  uint[] votesContre;
  string nomAssemble;

  constructor(string nom) public {
    nomAssemble = nom;
  }

  function rejoindre() public {
    participants.push(msg.sender);
  }

  function estMembre(address par) public view returns (bool) {
    for (uint i=0; i<participants.length; i++) {
      if (participants[i]==par){
        return true;
      }
    }
    return false;
  }

  function proposerUnVote(string description) public {
    if(estMembre(msg.sender)){
      descriVotes.push(description);
      votesPour.push(0);
      votesContre.push(0);
    }

  }

  function voter(uint v,bool sens)public {
    if(estParticipant(msg.sender)){
      if (sens) {
        votesPour[v]+=1;
     }else {
        votesContre[v]+=1;
      }
    }
  }

  function getVotesPour(uint ind) public view {
    return votesPour[ind];
  }

  function vetVotesContre(uint ind) public view {
    return votesContre[ind];
  }   
  
}