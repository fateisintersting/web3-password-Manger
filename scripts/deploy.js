const hre = require("hardhat");

async function main() {
  const PasswordManager = await hre.ethers.getContractFactory("PasswordManager");
  const passwordManager = await PasswordManager.deploy();
  await passwordManager.waitForDeployment();
  console.log("Contract deployed to:", passwordManager.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
