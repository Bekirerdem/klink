// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Test} from "forge-std/Test.sol";
import {MockUSDC} from "../src/MockUSDC.sol";
import {LoyaltyNFT} from "../src/LoyaltyNFT.sol";
import {TipPool} from "../src/TipPool.sol";
import {PayBill} from "../src/PayBill.sol";

contract PayBillTest is Test {
    MockUSDC internal usdc;
    LoyaltyNFT internal loyalty;
    PayBill internal payBill;
    TipPool internal pool;

    address internal merchant = makeAddr("merchant");
    address internal customer = makeAddr("customer");
    address internal barmen = makeAddr("barmen");
    address internal garson = makeAddr("garson");

    function setUp() public {
        usdc = new MockUSDC();
        loyalty = new LoyaltyNFT();
        payBill = new PayBill(usdc, loyalty);
        loyalty.setMinter(address(payBill));

        vm.prank(merchant);
        pool = new TipPool(usdc, merchant, address(payBill));

        vm.startPrank(merchant);
        pool.addStaff(barmen, 0);
        pool.addStaff(garson, 0);
        vm.stopPrank();

        usdc.mint(customer, 500e6);
        vm.prank(customer);
        usdc.approve(address(payBill), type(uint256).max);
    }

    function test_payBill_happyPath() public {
        uint256 bill = 140e6;
        uint256 tip = 21e6;
        bytes32 receipt = keccak256("masa-4-1715856000");

        vm.expectEmit(true, true, true, true);
        emit PayBill.BillPaid(customer, merchant, address(pool), bill, tip, receipt);

        vm.prank(customer);
        payBill.payBill(merchant, address(pool), bill, tip, receipt);

        assertEq(usdc.balanceOf(customer), 500e6 - bill - tip, "customer debited");
        assertEq(usdc.balanceOf(merchant), bill, "merchant credited");
        assertEq(usdc.balanceOf(barmen), tip / 2, "barmen share");
        assertEq(usdc.balanceOf(garson), tip - tip / 2, "garson share (with rounding)");
        assertEq(loyalty.balanceOf(customer, loyalty.tokenIdFor(merchant)), 1, "stamp minted");
    }

    function test_payBill_billOnlyNoTip() public {
        uint256 bill = 80e6;

        vm.prank(customer);
        payBill.payBill(merchant, address(0), bill, 0, bytes32(0));

        assertEq(usdc.balanceOf(merchant), bill);
        assertEq(usdc.balanceOf(barmen), 0);
        assertEq(usdc.balanceOf(garson), 0);
        assertEq(loyalty.balanceOf(customer, loyalty.tokenIdFor(merchant)), 1);
    }

    function test_payBill_revertsOnZeroAmounts() public {
        vm.prank(customer);
        vm.expectRevert(PayBill.InvalidAmounts.selector);
        payBill.payBill(merchant, address(pool), 0, 0, bytes32(0));
    }

    function test_payBill_revertsOnZeroMerchant() public {
        vm.prank(customer);
        vm.expectRevert(PayBill.InvalidMerchant.selector);
        payBill.payBill(address(0), address(pool), 100e6, 10e6, bytes32(0));
    }

    function test_tipPool_weightedDistribution() public {
        vm.startPrank(merchant);
        pool.setRule(TipPool.DistributionRule.WEIGHTED);
        pool.removeStaff(barmen);
        pool.removeStaff(garson);
        pool.addStaff(barmen, 3);
        pool.addStaff(garson, 1);
        vm.stopPrank();

        uint256 tip = 40e6;
        vm.prank(customer);
        payBill.payBill(merchant, address(pool), 0, tip, bytes32(0));

        assertEq(usdc.balanceOf(barmen), 30e6, "barmen takes 3/4");
        assertEq(usdc.balanceOf(garson), 10e6, "garson takes 1/4");
    }

    function test_loyalty_minterCannotBeReassigned() public {
        vm.expectRevert(LoyaltyNFT.MinterAlreadySet.selector);
        loyalty.setMinter(address(0x1234));
    }
}
