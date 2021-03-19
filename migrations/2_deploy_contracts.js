var DappDojoToken = artifacts.require("./DappDojoToken.sol");
var TokenSale = artifacts.require("./TokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");

require('dotenv').config({path: '../.env'});
const initialTokens = process.env.INITIAL_TOKENS;

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(DappDojoToken, initialTokens);
    await deployer.deploy(KycContract);
    await deployer.deploy(TokenSale, 1, addr[0], DappDojoToken.address, KycContract.address);
    
    let tokenInstance = await DappDojoToken.deployed();
    await tokenInstance.transfer(TokenSale.address, initialTokens);
};