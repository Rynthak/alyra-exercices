'use strict';
const path = require("path");
module.exports = {
		
 contracts_build_directory: path.join(__dirname, "client/src/contracts"),
		
  networks: {
    local: {
      host: 'localhost',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: '*'
    }
  }
};