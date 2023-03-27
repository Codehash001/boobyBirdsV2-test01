const hre = require('hardhat')

const _initBaseURI='ipfs://pinataLinkCid/'

async function main() {

  // Deploy the contract
  const contract = await hre.ethers.getContractFactory('BoobyBirds')
  const Contract = await contract.deploy(
    _initBaseURI)
  await Contract.deployed()

  console.log('contract deployed to:', Contract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
