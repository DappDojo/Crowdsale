// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./Crowdsale.sol";
import "./KycContract.sol";

contract TokenSale is Crowdsale {

    KycContract kyc;

    constructor(
        uint256 _rate, // rate in TKNbits
        address payable _wallet,
        IERC20 _token,
        KycContract _kyc
    )Crowdsale(_rate, _wallet, _token)
    {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) 
        internal 
        view 
        override 
    {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(beneficiary), "KYC not completed yet, aborting");
    }
}