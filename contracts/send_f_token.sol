// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SendFToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("SendFToken", "F") {
        _mint(msg.sender, initialSupply);
    }

    function reloadFaucet(address faucet) public onlyOwner  {
        require(this.balanceOf(address(this)) < 1000000);
        _mint(faucet, 10000000);
    }
}