"SPDX-License-Identifier: <SPDX-License>"
const path = require("path");
require('dotenv').config({path: './.env'});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: () => 
          new HDWalletProvider(
            process.env.MNEMONIC,
            `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`
          ),
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "^0.7.6"
    }
  }
};
