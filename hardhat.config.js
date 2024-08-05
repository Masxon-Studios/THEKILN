require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error("Please set your PRIVATE_KEY in a .env file");
  process.exit(1);
}

module.exports = {
  solidity: "0.8.17",
  networks: {
    baobab: {
      url: "https://api.baobab.klaytn.net:8651",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 1001,
      gas: 8500000,
      gasPrice: 250000000000,
    },
  },
};