// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title LoyaltyNFT
/// @notice Per-merchant loyalty stamps. Each merchant has its own token id
///         derived from the merchant address. The PayBill contract is the
///         sole minter once authorized.
contract LoyaltyNFT is ERC1155, Ownable {
    address public minter;

    error OnlyMinter();
    error MinterAlreadySet();

    event StampMinted(
        address indexed customer,
        address indexed merchant,
        uint256 indexed tokenId,
        uint256 amount
    );

    constructor() ERC1155("https://klink.app/api/loyalty/{id}.json") Ownable(msg.sender) {}

    function setMinter(address minter_) external onlyOwner {
        if (minter != address(0)) revert MinterAlreadySet();
        minter = minter_;
    }

    /// @notice Derive deterministic token id from merchant address.
    function tokenIdFor(address merchant) public pure returns (uint256) {
        return uint256(uint160(merchant));
    }

    /// @notice Mint one or more loyalty stamps for a (customer, merchant) pair.
    /// @dev Callable only by the configured minter (PayBill contract).
    function mintStamp(address customer, address merchant, uint256 amount) external {
        if (msg.sender != minter) revert OnlyMinter();
        uint256 id = tokenIdFor(merchant);
        _mint(customer, id, amount, "");
        emit StampMinted(customer, merchant, id, amount);
    }
}
