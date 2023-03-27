import {config}  from '../dapp.config'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('../scripts/whitelist.js')
const OGList = require('../scripts/OGList.js')

// global BigInt

const web3 = createAlchemyWeb3('https://eth-sepolia.g.alchemy.com/v2/YtSHYS1BcAFu1PPEY25zMv5cj0R39f-X')
const contract = require('../artifacts/contracts/BoobyBirds.sol/BoobyBirds.json')
const nftContract = new web3.eth.Contract(contract.abi, config.contractAddress)



//  get current state functions-------------------------------------->

export const isPaused = async () => {
  const isOGMintState = await nftContract.methods.paused().call()
  return isOGMintState
}

export const isWhitelistMintLive = async () => {
  const isWLMintState = await nftContract.methods.WhitelistMint_Live().call()
  return isWLMintState
}

export const isOGMintLive = async () => {
  const isOGMintState = await nftContract.methods.OGMint_Live().call()
  return isOGMintState
}

export const isPublicMintLive = async () => {
  const isPublicMintState = await nftContract.methods.PublicMint_Live().call()
  return isPublicMintState
}

//is valid golist address or is valid whitelist address--------------------->


export const isValidOGAddress = async () => {

      // Calculate merkle root from the OG List array
      const OGleafNodes = OGList.map((addr) => keccak256(addr))
      const OGmerkleTree = new MerkleTree(OGleafNodes, keccak256, { sortPairs: true })
      const OGroot = OGmerkleTree.getRoot()
    
      const OGleaf = keccak256(window.ethereum.selectedAddress)
      const OGproof = OGmerkleTree.getHexProof(OGleaf)
    
      // Verify Merkle Proof
      const isValidOGAddress = OGmerkleTree.verify(OGproof, OGleaf, OGroot)

      return isValidOGAddress

}

export const isValidWlAddress = async () => {

       // Calculate merkle root from the whitelist array
       const WLleafNodes = whitelist.map((addr) => keccak256(addr))
       const WLmerkleTree = new MerkleTree(WLleafNodes, keccak256, { sortPairs: true })
       const WLroot = WLmerkleTree.getRoot()
     
       const WLleaf = keccak256(window.ethereum.selectedAddress)
       const WLproof = WLmerkleTree.getHexProof(WLleaf)
     
       // Verify Merkle Proof
       const isValidWlAddress = WLmerkleTree.verify(WLproof, WLleaf, WLroot)

  return isValidWlAddress

}


export const getNumberMinted = async () => {
  const totalMinted = Number(await nftContract.methods.numberMinted(window.ethereum.selectedAddress).call())
  return totalMinted
}

export const getTotalMinted = async () => {
  const totalMinted = Number(await nftContract.methods.totalSupply().call())
  return totalMinted
}


//Set up OGMint------------------------------------------------------------------------------------>

export const OGMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet'
    }
  }

  // Calculate merkle root from the OG List array
  const leafNodes = OGList.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const root = merkleTree.getRoot()

  const leaf = keccak256(window.ethereum.selectedAddress)
  const proof = merkleTree.getHexProof(leaf)

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root)
  console.log('Validity',isValid)
//   if (!isValid) {

//    return {
//     success: false,
//     status: 'Invalid MerkleProof'
//   }		
// }

  const mintingAmount = Number(mintAmount)

  let MaxOG = Number(config.MAX_MINT_OG)
  let numberMinted = Number(await nftContract.methods.numberMinted(window.ethereum.selectedAddress).call())
  let MintableAmount = Number(MaxOG - numberMinted)
  
  const ExceededMaxMint = MintableAmount < mintingAmount
  console.log('ExceededMaxMint',ExceededMaxMint)
    if (ExceededMaxMint) {
      return {
        success: false,
        status:'Exceeded max Mint Amount '
      }
}

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )

  // Set up our Ethereum transaction

  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    gas: String(25000 * mintAmount),
    data: nftContract.methods
      .OGMint(mintingAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://goerli.etherscan.io/tx/${txHash}`} target="_blank">
          <p>✅ Check out your transaction on Etherscan ✅</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: '😞 Ooops!:' + error.message
    }
  }
}



//Set up Whitelist Mint------------------------------------------------------------------------------------>

export const WhitelistedMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet'
    }
  }
  // Calculate merkle root from the whitelist array
  const leafNodes = whitelist.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const root = merkleTree.getRoot()

  const leaf = keccak256(window.ethereum.selectedAddress)
  const proof = merkleTree.getHexProof(leaf)

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root)

  if (!isValid) { 
    return {
      success: false,
      status: '❌ Invalid Merkle Proof - You are not whitelisted'
    }
  }
  
  const mintingAmount = Number(mintAmount)


  let MaxWhitelist = Number(config.MAX_MINT_WHITELIST)
  let numberMinted = Number(await nftContract.methods.numberMinted(window.ethereum.selectedAddress).call())
  let MintableAmount = Number(MaxWhitelist - numberMinted)
  
  const ExceededMaxMint = MintableAmount < mintingAmount
  console.log('ExceededMaxMint',ExceededMaxMint)
    if (ExceededMaxMint) {
      return {
        success: false,
        status: 'Exceeded Max Mint Amount'
      }
}

  let cost = Number(config.WhiteListMintCost)

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )
  
  const mintingCost = ((cost*mintingAmount).toFixed(18))

  // Set up our Ethereum transaction

  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(mintingCost), 'ether')
    ).toString(16), // hex
    gas: String(25000 * mintAmount),
    data: nftContract.methods
      .WhitelistedMint(mintingAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://goerli.etherscan.io/tx/${txHash}`} target="_blank">
          <p>✅ Check out your transaction on Etherscan ✅</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: '😞 Ooops!:' + error.message
    }
  }
  }
  
  
  
  //Set up Public Mint------------------------------------------------------------------------------------>

export const PublicMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet'
    }
  }
    // Calculate merkle root from the OG List array
  const OGleafNodes = OGList.map((addr) => keccak256(addr))
  const OGmerkleTree = new MerkleTree(OGleafNodes, keccak256, { sortPairs: true })
  const OGroot = OGmerkleTree.getRoot()

  const OGleaf = keccak256(window.ethereum.selectedAddress)
  const OGproof = OGmerkleTree.getHexProof(OGleaf)

  // Verify Merkle Proof
  const isValidOGAddress = OGmerkleTree.verify(OGproof, OGleaf, OGroot)


   // Calculate merkle root from the whitelist array
   const WLleafNodes = whitelist.map((addr) => keccak256(addr))
   const WLmerkleTree = new MerkleTree(WLleafNodes, keccak256, { sortPairs: true })
   const WLroot = WLmerkleTree.getRoot()
 
   const WLleaf = keccak256(window.ethereum.selectedAddress)
   const WLproof = WLmerkleTree.getHexProof(WLleaf)
 
   // Verify Merkle Proof
   const isValidWlAddress = WLmerkleTree.verify(WLproof, WLleaf, WLroot)


  const mintingAmount = Number(mintAmount)

  let MaxPublic = Number(config.MAX_MINT_PUBLIC)
  let MaxOG = Number(config.MAX_MINT_OG)
  let MaxWhitelist = Number(config.MAX_MINT_WHITELIST)

  let numberMinted = Number(await nftContract.methods.numberMinted(window.ethereum.selectedAddress).call())
  let MintableAmount = Number(MaxPublic- numberMinted)
  let proof = OGproof

  if (isValidOGAddress) {
    MintableAmount = Number(MaxPublic + MaxOG - numberMinted)
    proof = OGproof
  }

  if (isValidWlAddress) {
    MintableAmount = Number(MaxPublic + MaxWhitelist - numberMinted)
    proof = WLproof
  }
  console.log('Minatble Amount ',MintableAmount)
  
  const ExceededMaxMint = MintableAmount < mintingAmount
  console.log('ExceededMaxMint',ExceededMaxMint)
    if (ExceededMaxMint) {
      return {
        success: false,
        status: 'Exceeded Max Mint Amount'
      }
}

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )
  
  const mintingCost = ((config.PublicMintCost*mintingAmount).toFixed(18))

  // Set up our Ethereum transaction

  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(mintingCost), 'ether')
    ).toString(16), // hex
    gas: String(25000 * mintAmount),
    data: nftContract.methods
      .PublicMint(mintingAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://goerli.etherscan.io/tx/${txHash}`} target="_blank">
          <p>✅ Check out your transaction on Etherscan ✅</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: '😞 Ooops!:' + error.message
    }
  }
}
