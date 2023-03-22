# Booby Birds minting dapp

1. Run npm i
2. Run npm start


IMPORTANT

Minting and blockchain actions happens in the MINT Component.

The mint component uses REDUX for connecting to the users wallet and to the smart contract.

Things you should adjust upon deployment:
- ABI (public/config/abi.json)
- config (public/config/config.json)
- Potentially the names of the Smart Contract function on the Mint component (src/pages/Mint.jsx)
