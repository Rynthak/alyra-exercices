var Monsters = artifacts.require("./Monsters.sol");

module.exports = function(deployer) {
    deployer.deploy(Monsters);
};