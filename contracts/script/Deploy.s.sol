// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script, console2} from "forge-std/Script.sol";
import {MockUSDC} from "../src/MockUSDC.sol";
import {LoyaltyNFT} from "../src/LoyaltyNFT.sol";
import {TipPool} from "../src/TipPool.sol";
import {PayBill} from "../src/PayBill.sol";

/// @notice Klink full stack deploy: USDC + Loyalty + PayBill + (optional seed merchant/staff).
///
/// Usage:
///   forge script script/Deploy.s.sol \
///     --rpc-url monad_testnet \
///     --private-key $DEPLOYER_PRIVATE_KEY \
///     --broadcast
///
/// Env (optional):
///   SEED_MERCHANT_ADDRESS  — if set, deploys a TipPool owned by this address
///   SEED_STAFF_ADDRESSES   — comma-separated, added as equal-rule staff
contract Deploy is Script {
    function run() external {
        uint256 deployerPk = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.addr(deployerPk);

        console2.log("Deployer:", deployer);

        vm.startBroadcast(deployerPk);

        MockUSDC usdc = new MockUSDC();
        LoyaltyNFT loyalty = new LoyaltyNFT();
        PayBill payBill = new PayBill(usdc, loyalty);
        loyalty.setMinter(address(payBill));

        vm.stopBroadcast();

        console2.log("MockUSDC:   ", address(usdc));
        console2.log("LoyaltyNFT: ", address(loyalty));
        console2.log("PayBill:    ", address(payBill));

        address seedMerchant = vm.envOr("SEED_MERCHANT_ADDRESS", address(0));
        if (seedMerchant != address(0)) {
            vm.startBroadcast(deployerPk);

            // Distributor argümanı immutable, merchant başkası olsa bile deploy edebiliriz.
            TipPool pool = new TipPool(usdc, seedMerchant, address(payBill));

            vm.stopBroadcast();

            console2.log("TipPool (seed):", address(pool));
            console2.log("  merchant:", seedMerchant);
            console2.log("  Note: merchant must call addStaff() to configure pool.");
        }

        console2.log("");
        console2.log("Copy these addresses into apps/web/.env.local:");
        console2.log("NEXT_PUBLIC_MOCK_USDC_ADDRESS=%s", address(usdc));
        console2.log("NEXT_PUBLIC_LOYALTY_NFT_ADDRESS=%s", address(loyalty));
        console2.log("NEXT_PUBLIC_PAY_BILL_ADDRESS=%s", address(payBill));
    }
}
