// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');
    let gameAddr = "0x76aB059eb0D26AE8521042becb44FD89ecA8B78E"
    // We get the contract to deploy

    AccountDeployer = await ethers.getContractFactory("AccountDeployer");
    accountDeployer = await AccountDeployer.deploy();
    await accountDeployer.deployed();

    Badge = await ethers.getContractFactory("Badge");
    badge = await Badge.deploy();
    await badge.deployed();

    Wallet = await ethers.getContractFactory("Wallet");
    wallet = await Wallet.deploy(accountDeployer.address , badge.address);
    await wallet.deployed();

    NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy(wallet.address);
    await nft.deployed();

    RentVault = await ethers.getContractFactory("RentVault");
    rentVault = await RentVault.deploy();
    await rentVault.deployed();  

    Account = await ethers.getContractFactory("Account");

    let tx = await badge._setwalletAddress(wallet.address)
    tx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
