const chai = require('chai');
const {createMockProvider, deployContract, getWallets} = require('ethereum-waffle');
const SimpleContractMock = require('../build/SimpleContract.json');
const {expect} = chai;

describe('Test SimpleContract', () => {
	
	  it('Should give a name', async () => {
		  const provider = createMockProvider();
		  const [ wallet ] = getWallets(provider);
		  const contract = await deployContract(wallet, SimpleContractMock, ['Simple Name']);
		  const name = await contract.name();
		  expect(name).to.eq('Simple Name');
	  });
	
});