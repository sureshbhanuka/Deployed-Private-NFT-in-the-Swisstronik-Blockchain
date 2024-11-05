// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Get the deployer's account to deploy the contract
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Retrieve the contract factory for PrivateNFT
  const PrivateNFT = await hre.ethers.getContractFactory("PrivateNFT");

  // Deploy the contract with the initial owner's address
  const privateNFT = await PrivateNFT.deploy(deployer.address);

  // Await deployment confirmation
  await privateNFT.waitForDeployment();

  console.log("PrivateNFT deployed to:", privateNFT.target);
}

// Run the deployment script with error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
