// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";

contract SampleERC721a is ERC721A {
    constructor(string memory name, string memory symbol) ERC721A(name, symbol) {}

    function mint(address to, uint256 quantity) external payable {
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        _safeMint(to, quantity);
    }
}
