// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DappDojoToken is ERC20 {

    constructor(uint initialSupply) ERC20("DappDojo Token", "DDT")  {
        _mint(msg.sender, initialSupply);
        _setupDecimals(0);
    }
}