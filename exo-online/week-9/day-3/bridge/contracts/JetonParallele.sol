pragma solidity ^0.5.2;

import "http://github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

contract JetonParallele is ERC20Mintable {
   string public constant name = "Jeton Parallele";
   string public constant symbol = "PLL";
   uint8 public constant decimals = 0;
}