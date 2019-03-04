const chai = require('chai');
const {createMockProvider, deployContract, getWallets,solidity} = require('ethereum-waffle');
const SimpleContractMock = require('../build/SimpleContract.json');
const {expect} = chai;

chai.use(solidity);
describe('Test SimpleContract', () => {
	  const provider = createMockProvider();
	  const [ wallet , walletTo ] = getWallets(provider);
	  let contract;
	  const baseName = 'Simple Name';
	  beforeEach(async () => {
		 contract = await deployContract(wallet, SimpleContractMock, [baseName]);
	  });
	
	  it('Should give a name', async () => {
		  const name = await contract.name();
		  expect(name).to.eq(baseName);
	  });
	  
	 it('Should change the name', async () => {
		  await contract.setName('Simple Name Modified');
		  const nameModified = await contract.name();
		  expect(nameModified).to.eq('Simple Name Modified');
	  });
	 
	 it('Should setName emits event', async () => {
		    await expect(contract.setName('Hi Buddy'))
		      .to.emit(contract, 'NameChanged')
		      .withArgs('Hi Buddy');
	  });
	 
	 it('Should setName reverted', async () => {
		 	const contractFromOtherWallet = contract.connect(walletTo);
		    await expect(contractFromOtherWallet.setName('Hi Buddy 2')).to.be.reverted;
	 });

	
});