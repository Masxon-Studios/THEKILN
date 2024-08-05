// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/access/AccessControl.sol";

contract NFTMinter is KIP17URIStorage, Ownable, AccessControl {
    uint256 private _tokenIds;
    uint256 public maxSupply;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event Minted(address indexed recipient, uint256 tokenId, string newTokenURI);

    constructor(uint256 _maxSupply) KIP17("NFTMinter", "NFT") {
        maxSupply = _maxSupply;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function mintNFT(address recipient, string memory newTokenURI)
        public onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        require(_tokenIds < maxSupply, "Max supply reached");
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, newTokenURI);

        emit Minted(recipient, newItemId, newTokenURI);

        return newItemId;
    }

    function updateTokenURI(uint256 tokenId, string memory newTokenURI) public onlyOwner {
        _setTokenURI(tokenId, newTokenURI);
    }

    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        require(_maxSupply > _tokenIds, "New max supply must be greater than current supply");
        maxSupply = _maxSupply;
    }

    function setMinterRole(address minter) public onlyOwner {
        grantRole(MINTER_ROLE, minter);
    }

    function revokeMinterRole(address minter) public onlyOwner {
        revokeRole(MINTER_ROLE, minter);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(KIP17URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
