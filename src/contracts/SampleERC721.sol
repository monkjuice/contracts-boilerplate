// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.3;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract SampleERC721 is ERC721Upgradeable {
    function initialize(string memory name_, string memory symbol_) external initializer {
        __ERC721_init(name_, symbol_);
    }

    // this is a sample contract so anyone can mint
    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}