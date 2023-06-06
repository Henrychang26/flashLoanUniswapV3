const { ethers } = require("hardhat");

//Deploy tokens and mint to owner

async function main() {
  const [owner] = await ethers.getSigners();

  const Tether = await ethers.getContractFactory("Tether", owner);
  const tether = await Tether.deploy();

  const Usdc = await ethers.getContractFactory("UsdCoin", owner);
  const usdc = await Usdc.deploy();

  await tether
    .connect(owner)
    .mint(owner.address, ethers.utils.parseEther("100000"));

  await usdc
    .connect(owner)
    .mint(owner.address, ethers.utils.parseEther("100000"));

  console.log("TETHER_ADDRESS=", `'${tether.address}'`);
  console.log("USDC_ADDRESS=", `'${usdc.address}'`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
