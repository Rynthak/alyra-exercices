const chai = require('chai');
const {createMockProvider, deployContract, getWallets} = require('ethereum-waffle');
const SimpleContractMock = require('../build/SimpleContract.json');
const {expect} = chai;

describe('Test SimpleContract', () => {
	  const provider = createMockProvider();
	  const [ wallet ] = getWallets(provider);
	  let contract;
	  beforeEach(async () => {
		 contract = await deployContract(wallet, SimpleContractMock, ['Simple Name']);
	  });
	
	  it('Should give a name', async () => {
		  const name = await contract.name();
		  expect(name).to.eq('Simple Name');
	  });
	  
	 it('Should change the name', async () => {
		  
		  await contract.setName('Simple Name Modified');
		  const nameModified = await contract.name();
		  expect(nameModified).to.eq('Simple Name Modified');
		  
		  await contract.setName('Simple Name');
		  const nameModifiedBase = await contract.name();
		  expect(nameModifiedBase).to.eq('Simple Name');
	  });
	
});