require ('@nomiclabs/hardhat-etherscan')
const hre = require( 'hardhat')

const _initBaseURI='ipfs://pinataLinkCid/'


async function main() {

  await hre.run('verify:verify', {
    address: '0xc65d111405249b32Ad69c05BA63DAed1f24D99e9',
    constructorArguments: [_initBaseURI]
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
