//Write your own contracts here. Currently compiles using solc v0.4.15.
pragma solidity ^0.4.25;
contract Assemblee {
 address[]  participants;

 function rejoindre() public {
   participants.push(msg.sender);
 }

 function estParticipant(address par) public constant returns (bool) {
   for (uint i = 0; i < participants.length; i++) {
     if (participants[i] == par) {
       return true;
     }
   }
   return false;
 }

}