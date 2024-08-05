const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("NFTMinter", function () {
  let NFTMinter;
  let nftMinter;
  let owner;
  let addr1;

  beforeEach(async function () {
    NFTMinter = await ethers.getContractFactory("NFTMinter");
    [owner, addr1] = await ethers.getSigners();
    nftMinter = await NFTMinter.deploy(10000); // Example max supply
    await nftMinter.waitForDeployment();
  });

  it("Should mint a new NFT", async function () {
    const tokenURI = "https://example.com/token/1";
    await nftMinter.mintNFT(addr1.address, tokenURI);
    expect(await nftMinter.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should set token URI correctly", async function () {
    const tokenURI = "https://example.com/token/1";
    await nftMinter.mintNFT(addr1.address, tokenURI);
    expect(await nftMinter.tokenURI(1)).to.equal(tokenURI);
  });

  it("Should only allow minters to mint NFTs", async function () {
    const tokenURI = "https://example.com/token/1";
    await expect(
      nftMinter.connect(addr1).mintNFT(addr1.address, tokenURI)
    ).to.be.revertedWith(`AccessControl: account ${addr1.address.toLowerCase()} is missing role ${await nftMinter.MINTER_ROLE()}`);
  });

  it("Should allow owner to grant minter role", async function () {
    await nftMinter.setMinterRole(addr1.address);
    expect(await nftMinter.hasRole(await nftMinter.MINTER_ROLE(), addr1.address)).to.be.true;
  });

  it("Should allow minter to mint NFTs after being granted role", async function () {
    await nftMinter.setMinterRole(addr1.address);
    const tokenURI = "https://example.com/token/2";
    await nftMinter.connect(addr1).mintNFT(addr1.address, tokenURI);
    expect(await nftMinter.ownerOf(2)).to.equal(addr1.address);
  });

  it("Should not allow exceeding max supply", async function () {
    const tokenURI = "https://example.com/token/";
    // Mint all available NFTs
    for (let i = 0; i < 10000; i++) {
      await nftMinter.mintNFT(owner.address, `${tokenURI}${i}`);
    }
    // Try to mint one more, should fail
    await expect(
      nftMinter.mintNFT(owner.address, `${tokenURI}10000`)
    ).to.be.revertedWith("Max supply reached");
  });
});
