// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SendFToken is ERC20, Ownable {
    mapping(address => uint256) public startTime;
    constructor() ERC20("SendFToken", "F") {
     
    }
    function hasElapsed() private returns (bool) {
        if (block.timestamp >= startTime[msg.sender] + 60 minutes) {
            return true;
        }
        return false;
    }
    function claim() public {
        require(msg.sender != address(0));
        require(hasElapsed());
        _mint(msg.sender, 100000000000000000000);
        startTime[msg.sender] = block.timestamp;
    }
}