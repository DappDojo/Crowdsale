const DappDojoToken = artifacts.require("DappDojoToken");
const TokenSale = artifacts.require("TokenSale");
const KycContract = artifacts.require("KycContract");

var chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({path: '../.env'});
let initialTokens = process.env.INITIAL_TOKENS;

contract("TokenSale", async function(accounts) {
    const [ initialHolder, recipient, anotherAccount ] = accounts;
    
    before(async () => {
        tokenInstance = await DappDojoToken.deployed();
        totalSupply = await tokenInstance.totalSupply();
        tokenSaleInstance = await TokenSale.deployed();
    });
    
    it("there shouldnt be any coins in my account", async () => {
        return expect(tokenInstance.balanceOf.call(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all coins should be in the tokensale smart contract", async () => {
        let balance = await tokenInstance.balanceOf.call(TokenSale.address);
        let totalSupply = await tokenInstance.totalSupply.call();
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });
    
    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);

        expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1","wei")})).to.be.rejected;
        expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(recipient);

        expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1","wei")})).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    });
});