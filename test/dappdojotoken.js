const DappDojoToken = artifacts.require("DappDojoToken");

var chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({path: '../.env'});

let initialTokens = process.env.INITIAL_TOKENS;

contract("DappDojo Token Test", function(accounts) {
    const [initialHolder, recipient, anotherAccount ] = accounts;

    before(async () => {
        instance = await DappDojoToken.new(initialTokens);
        totalSupply = await instance.totalSupply();
    });
    
    it("All tokens should initially be in sender's account.", async () => {
        //traditional style:
        //let balance = web3.utils.toBN(await instance.balanceOf.call(initialHolder));
        //assert.equal(balance.toNumber(), web3.utils.toBN(totalSupply).toNumber(), "Account 1 has a balance");
        //using chai-like style:
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Send tokens from Account 1 to Account 2.", async () => {
        const sendTokens = 1;        
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("It is not possible to send more tokens than account 1 has.", async () => {
        let balanceOfAccount = await instance.balanceOf(initialHolder);
        expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;
        //check if the balance is still the same
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
});