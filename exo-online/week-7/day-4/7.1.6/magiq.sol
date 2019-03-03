pragma solidity ^0.5.3;


import "github.com/Rynthak/alyra-exercices/exo-online/week-7/day-4/7.1.5/magiq.sol";


contract ObjetsMagiquesV3 is ObjetsMagiquesV2 {
	
	
	function utiliser(uint256 tokenId) public returns (uint256){
		require(ownerOf(tokenId)==msg.sender);
		
		uint256 random = uint256(blockhash(block.number-1))%10;
		if(random==0){
			_burn(msg.sender,tokenId);
		} 
		return random;
	}
	
	function transferFrom(address _from, address _to, uint256 _tokenId) public{ 
		require(!_isDivin(_tokenId));
		super.transferFrom(_from,_to,_tokenId);
	}
	function _isDivin(uint256 _tokenId) public pure returns (bool){
		
		return uint(_tokenId/1000)==2;
	} 
	
	
	function _burn(address owner, uint256 tokenId) internal {
        require(ownerOf(tokenId) == owner);
        _ownedTokensCount[owner].decrement();
        tokens[tokenId] = address(0);
        emit Transfer(owner, address(0), tokenId);
    }
	
}