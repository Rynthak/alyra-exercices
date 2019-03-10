var MonstersContract = artifacts.require("./MonstersContract.sol");

module.exports = function(deployer) {
  deployer.deploy(MonstersContract);
};
