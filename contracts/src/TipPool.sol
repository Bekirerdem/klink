// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title TipPool
/// @notice On-chain bahşiş havuzu. Mekan staff cüzdanları ekliyor, dağıtım
///         kuralı set'liyor (eşit veya ağırlıklı). Bahşiş geldiğinde
///         PayBill contract `distribute` çağırıyor, anlık dağılım yapılıyor.
/// @dev Patron havuzu manipüle edemez — addStaff/removeStaff/setRule sadece
///      kurulum aşamasında merchant tarafından yapılır.
contract TipPool {
    using SafeERC20 for IERC20;

    enum DistributionRule {
        EQUAL,
        WEIGHTED
    }

    IERC20 public immutable usdc;
    address public immutable merchant;
    address public immutable distributor; // PayBill contract

    DistributionRule public rule;
    address[] public staff;
    mapping(address => uint256) public weightOf; // for WEIGHTED rule
    mapping(address => bool) public isStaff;

    error NotMerchant();
    error NotDistributor();
    error StaffAlreadyAdded();
    error StaffNotFound();
    error NoStaff();
    error InvalidWeight();

    event StaffAdded(address indexed staff, uint256 weight);
    event StaffRemoved(address indexed staff);
    event RuleChanged(DistributionRule rule);
    event TipDistributed(uint256 totalAmount, uint256 staffCount);

    modifier onlyMerchant() {
        if (msg.sender != merchant) revert NotMerchant();
        _;
    }

    modifier onlyDistributor() {
        if (msg.sender != distributor) revert NotDistributor();
        _;
    }

    constructor(IERC20 usdc_, address merchant_, address distributor_) {
        usdc = usdc_;
        merchant = merchant_;
        distributor = distributor_;
        rule = DistributionRule.EQUAL;
    }

    function addStaff(address member, uint256 weight) external onlyMerchant {
        if (isStaff[member]) revert StaffAlreadyAdded();
        if (rule == DistributionRule.WEIGHTED && weight == 0) revert InvalidWeight();

        staff.push(member);
        isStaff[member] = true;
        weightOf[member] = weight;
        emit StaffAdded(member, weight);
    }

    function removeStaff(address member) external onlyMerchant {
        if (!isStaff[member]) revert StaffNotFound();

        uint256 length = staff.length;
        for (uint256 i = 0; i < length; i++) {
            if (staff[i] == member) {
                staff[i] = staff[length - 1];
                staff.pop();
                break;
            }
        }
        isStaff[member] = false;
        weightOf[member] = 0;
        emit StaffRemoved(member);
    }

    function setRule(DistributionRule rule_) external onlyMerchant {
        rule = rule_;
        emit RuleChanged(rule_);
    }

    function staffCount() external view returns (uint256) {
        return staff.length;
    }

    /// @notice Distribute incoming tip across staff according to rule.
    /// @dev Caller (PayBill) must have already transferred `amount` into this contract.
    function distribute(uint256 amount) external onlyDistributor {
        uint256 length = staff.length;
        if (length == 0) revert NoStaff();

        if (rule == DistributionRule.EQUAL) {
            uint256 share = amount / length;
            uint256 remainder = amount - (share * length);
            for (uint256 i = 0; i < length; i++) {
                // Last staff member absorbs rounding remainder.
                uint256 payout = i == length - 1 ? share + remainder : share;
                usdc.safeTransfer(staff[i], payout);
            }
        } else {
            uint256 totalWeight;
            for (uint256 i = 0; i < length; i++) {
                totalWeight += weightOf[staff[i]];
            }
            uint256 distributed;
            for (uint256 i = 0; i < length; i++) {
                uint256 payout = i == length - 1
                    ? amount - distributed
                    : (amount * weightOf[staff[i]]) / totalWeight;
                distributed += payout;
                usdc.safeTransfer(staff[i], payout);
            }
        }

        emit TipDistributed(amount, length);
    }
}
