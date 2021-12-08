pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Faucet {
    using SafeMath for uint256;

    ERC20 public token;
    address public wallet;
    uint256 public rate;
    uint256 public weiRaised;
    mapping(address => uint256) public startTime;

    constructor(
        uint256 _amount,
        address _wallet,
        ERC20 _token
    ) public {
        require(_amount > 0);
        require(_wallet != address(0));
        require(_token != address(0));

        amount = _amount;
        wallet = _wallet;
        token = _token;
    }

    function() external payable {
        buyTokens(msg.sender);
    }

    function hasElapsed() public returns (bool hasElapsed) {
        if (now >= startTime[msg.sender] + 10 minutes) {
            // 10 minutes has elapsed from startTime[msg.sender]
            return true;
        }
        return false;
    }

    function claim(address _beneficiary) public {
        require(_beneficiary != address(0));
        token.transfer(_beneficiary, amount);
        startTime[msg.sender] = now;
    }
}
