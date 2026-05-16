// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {LoyaltyNFT} from "./LoyaltyNFT.sol";
import {TipPool} from "./TipPool.sol";

/// @title PayBill
/// @notice Klink ödeme giriş noktası. Tek transaction'da:
///           1. Müşteri → mekan (bill amount)
///           2. Müşteri → tip pool (tip amount)
///           3. TipPool.distribute() (staff'a dağıtım)
///           4. LoyaltyNFT.mintStamp() (sadakat mührü)
///         Komisyonsuz, anlık. Tek event ile front-end live feed besler.
contract PayBill {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    LoyaltyNFT public immutable loyalty;

    error InvalidAmounts();
    error InvalidMerchant();

    event BillPaid(
        address indexed customer,
        address indexed merchant,
        address indexed tipPool,
        uint256 billAmount,
        uint256 tipAmount,
        bytes32 receiptHash
    );

    constructor(IERC20 usdc_, LoyaltyNFT loyalty_) {
        usdc = usdc_;
        loyalty = loyalty_;
    }

    /// @notice Pay a bill with optional tip and mint a loyalty stamp.
    /// @param merchant     Mekan cüzdanı (bill amount buraya gider)
    /// @param tipPool      TipPool contract adresi (tip amount buraya gider, address(0) ise bahşiş yok)
    /// @param billAmount   Adisyon tutarı (USDC, 6 decimals)
    /// @param tipAmount    Bahşiş tutarı (USDC, 6 decimals)
    /// @param receiptHash  İsteğe bağlı off-chain makbuz hash'i (front-end için referans)
    function payBill(
        address merchant,
        address tipPool,
        uint256 billAmount,
        uint256 tipAmount,
        bytes32 receiptHash
    ) external {
        if (merchant == address(0)) revert InvalidMerchant();
        if (billAmount == 0 && tipAmount == 0) revert InvalidAmounts();

        // 1) Müşteri → mekan
        if (billAmount > 0) {
            usdc.safeTransferFrom(msg.sender, merchant, billAmount);
        }

        // 2) Müşteri → tip pool ve anında dağıtım
        if (tipAmount > 0 && tipPool != address(0)) {
            usdc.safeTransferFrom(msg.sender, tipPool, tipAmount);
            TipPool(tipPool).distribute(tipAmount);
        }

        // 3) Sadakat mührü
        loyalty.mintStamp(msg.sender, merchant, 1);

        emit BillPaid(msg.sender, merchant, tipPool, billAmount, tipAmount, receiptHash);
    }
}
