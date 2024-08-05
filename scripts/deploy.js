async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Define the max supply for the NFTs
    const maxSupply = 10000; // Example max supply, adjust as needed

    // Get the contract factory
    const NFTMinter = await ethers.getContractFactory("NFTMinter");

    // Deploy the contract with the maxSupply argument
    const nftMinter = await NFTMinter.deploy(maxSupply);
    await nftMinter.deployed();

    console.log("NFTMinter deployed to:", nftMinter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
