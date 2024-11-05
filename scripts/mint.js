const hre = require("hardhat");

async function main() {
    const [signer] = await hre.ethers.getSigners();
    const contractAddress = "0xbEDF90223976f4DC9d5257C85d445b1725089971"; // Replace with your deployed contract address

    // Connect to the deployed contract
    const nftContract = await hre.ethers.getContractAt("PrivateNFT", contractAddress);

    // Specify the recipient's address
    const recipientAddress = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1"; // Replace with the wallet address for minting

    console.log(`Minting NFT to: ${recipientAddress}`);

    // Call the mint function and wait for confirmation
    const tx = await nftContract.safeMint(recipientAddress); // Call safeMint directly
    console.log("Minting transaction sent. Waiting for confirmation...");

    await tx.wait();
    console.log(`Minting successful! Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
    console.error("Minting failed:", error);
    process.exitCode = 1;
});
