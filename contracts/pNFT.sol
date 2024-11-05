// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => address) private _viewers; // Mapping to store who can view each token's URI

    constructor(address initialOwner)
        ERC721("PrivateNFT", "PNFT")
        Ownable(initialOwner)
    {}

    // Function to mint the NFT privately
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri); // Set the token URI
    }

    // Set a viewer for a specific token's URI
    function setViewer(uint256 tokenId, address viewer) public onlyOwner {
        _viewers[tokenId] = viewer;
    }

    // Override tokenURI to restrict access to only authorized viewers
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(
            msg.sender == ownerOf(tokenId) || msg.sender == _viewers[tokenId],
            "Not authorized to view this token's URI"
        );
        return super.tokenURI(tokenId);
    }
}
