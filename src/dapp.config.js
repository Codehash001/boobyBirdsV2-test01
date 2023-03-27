const RPC_URL = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL

const config = {
  title: 'Dapp',
  description: 'minting Dapp',
  contractAddress: '0x13e7336D67f092e49870e9ed548e0035573e34dF',
  ALCHEMY_RPC_URL:'',

  maxSupply : 3100,
  MAX_MINT_PUBLIC: 4,
  MAX_MINT_OG: 1,
  MAX_MINT_WHITELIST: 4,

  PublicMintCost: 0.035,
  WhiteListMintCost : 0.03
}

// const onboardOptions = {
//   dappId: process.env.NEXT_PUBLIC_DAPP_ID,
//   networkId: 5, // Goerli
//   darkMode: true,
//   walletSelect: {
//     description:'Plaese select a wallet',
//     wallets: [
//       { walletName: 'metamask', preferred: true },
//       { walletName: 'coinbase', preferred: true },
//       {
//         walletName: 'walletLink',
//         preferred: true,
//         rpcUrl: RPC_URL,
//         appName: 'Dapp'
//       },
      
//       { walletName: 'trust', preferred: true, rpcUrl: RPC_URL },
//       { walletName: 'gnosis'},
//       { walletName: 'authereum' },

//       {
//         walletName: 'ledger',
//         rpcUrl: RPC_URL
//       },
//       {
//         walletName: 'lattice',
//         rpcUrl: RPC_URL,
//         appName: 'Dapp'
//       },
//       {
//         walletName: 'keepkey',
//         rpcUrl: RPC_URL
//       }
//     ]
//   },
//   walletCheck: [
//     { checkName: 'derivationPath' },
//     { checkName: 'accounts' },
//     { checkName: 'connect' },
//     { checkName: 'network' }
//   ]
//}

export {config}
