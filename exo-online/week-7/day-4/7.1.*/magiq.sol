pragma solidity ^0.5.3;


import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/ERC721BasicToken.sol";

contract ObjetsMagiques is ERC721BasicToken{
	
	
	using SafeMath for uint256;
	
	function creuser()public payable{
		require(msg.value  >= 100 finney,"La somme envoyé n'est pas suffisante");
		uint256 tokenId = uint256((blockhash(block.number-1)) )& 0xffffff;
		 			
		_mint(msg.sender,tokenId);
	}
	modifier canTransfer(uint256 _tokenId) {
    require(isApprovedOrOwner(msg.sender, _tokenId));
    require(!isDivin(_tokenId));
    _;
   } 
	
	function isDivin(_tokenId) public view returns(book){
		
		return false;
	}	
	
	
}