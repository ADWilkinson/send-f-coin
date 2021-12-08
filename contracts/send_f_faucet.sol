// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Faucet {
    using SafeMath for uint256;

    ERC20 public token;
    uint256 public amount;
    mapping(address => uint256) public startTime;

    constructor(
        uint256 _amount,
        ERC20 _token
    ) {
        require(_amount > 0);
        amount = _amount;
        token = _token;
    }

    function hasElapsed() private returns (bool) {
        if (block.timestamp >= startTime[msg.sender] + 10 minutes) {
            // 10 minutes has elapsed from startTime[msg.sender]
            return true;
        }
        return false;
    }

    function claim() public {
        require(msg.sender != address(0));
        require(hasElapsed());
        token.transfer(msg.sender, amount);
        startTime[msg.sender] = block.timestamp;
    }
}
