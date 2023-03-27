import React, { useEffect, useState, useRef } from "react";
import './mint.css'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  OGMint,
  WhitelistedMint,
  PublicMint,
  getTotalMinted,
  isPaused,
  isOGMintLive,
  isWhitelistMintLive,
  isPublicMintLive,
  isValidOGAddress,
  isValidWlAddress,
  getNumberMinted
} from '../ulits/interact';
import {config} from '../dapp.config'



function Mint() {

const account = useAccount()

const [mutedVid, setMutedVid] = useState(true);
const handleMutedVid = () => {
  setMutedVid(!mutedVid);
};

const [isPausedState , setIsPauseState] = useState (false);
const [isOGstate , setIsOGState] = useState (false) ;
const [isWLState, setIsWLState] = useState (false) ;
const [isPublicState, setIsPublicStat] = useState (false);
const [isValidOGUser, setIsValidOGUser] = useState(false);
const [isValidWLUser, setIsValidWlUser] = useState(false);

const [numberMinted, setNumberMinted ] = useState (0);
const [totalMinted , setTotalMinted] = useState (0);

const [status, setStatus] = useState('')
const [success, setSuccess] = useState(false)

const [mintAmount, setMintAmount] = useState(1)
const [isMinting, setIsMinting] = useState(false)
const [maxMintAmount , setMaxMintAmount]= useState(1)
const [cost , setCost] = useState(0)

useEffect(() => {
  const init = async () => {
    setTotalMinted(await getTotalMinted())

    setIsPauseState(await isPaused())
    setIsPublicStat(await isPublicMintLive())
    setIsOGState(await isOGMintLive())
    setIsWLState(await isWhitelistMintLive())
    
    
  }

  init()
}, []);

useEffect(() => {
  const init = async () => {
    setIsValidOGUser(await isValidOGAddress())
    setIsValidWlUser(await isValidWlAddress())
    setNumberMinted(await getNumberMinted())
    setMaxMintAmount(isOGstate && isValidOGUser && numberMinted < config.MAX_MINT_OG ? config.MAX_MINT_OG :
      isWLState && isValidWLUser && numberMinted < config.MAX_MINT_WHITELIST ? config.MAX_MINT_WHITELIST : config.MAX_MINT_PUBLIC)
    setCost(
      isOGstate && isValidOGUser && numberMinted < config.MAX_MINT_OG ? 0 :
      isWLState && isValidWLUser && numberMinted < config.MAX_MINT_WHITELIST ? config.WhiteListMintCost : config.PublicMintCost
    )
  }

  init()
}, );

const publicMintHandler = async () => {
  setIsMinting(true)

  const { success, status } = await PublicMint(mintAmount)

  setStatus(status)
  setSuccess(success)
  
  setIsMinting(false)
}

const OGMintHandler = async () => {
  setIsMinting(true)

  const { success, status } = await OGMint(mintAmount)

  setStatus(status)
  setSuccess(success)

  setIsMinting(false)
}

const WlMintHandler = async () => {
  setIsMinting(true)

  const { success, status } = await WhitelistedMint(mintAmount)

  setStatus(status)
  setSuccess(success)

  setIsMinting(false)
}

const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1)
    }
  }


  return (
    <>
      
          <div className='mainContainer'>
            <div className='navCointainer font-Besty'>
              <a href='#'><h1>Home</h1></a>
              <img className="logo" src='config/images/logo.png'/>
              <a href='#'><h1>Mint</h1></a>
            </div>

            <div className="video_wrapper">
            <div className="inn_video_wrapper">
            <div className="mint_soundlink">
              <button className="soundlink_button" onClick={handleMutedVid}>
                <img src="config/images/volume.png" alt="" />
              </button>
            </div>

            <video className="VideoTag" id="video" autoPlay loop muted={mutedVid}>
              <source
                src={"./config/images/vid/web3-cartoon-subtitled.mp4"}
                type="video/mp4"
              />
            </video>
            </div>
          </div>

            <div className='MintContainer'>
              <h2 className='mint_date'>MINT DATE: 29th March 2023. STAY TUNED!</h2>
              <div className='inn_mint_wrapper'>
              <img className="gif" src='config/images/BoobyB.gif'/>
              <div className='mintSection'>
                <h2> <span>Minting is Live!</span></h2>
                <h2 className='mintState'>{isOGstate && isValidOGUser && numberMinted < config.MAX_MINT_OG ? 'OG Mint' : isWLState && isValidWLUser && numberMinted < config.MAX_MINT_WHITELIST ? 'WhiteListed Sale' : isPublicState ?'PublicSale': ''}</h2>
                <h3> {totalMinted} / 3100 </h3>
                {/* + and - buttons */}
                <div className="incButtonContainer"> 
                <svg onClick={decrementMintAmount} xmlns="http://www.w3.org/2000/svg" className="SVG" viewBox="0 0 24 24" fill="000"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11H7v-2h10v2z"></path></svg>
                <h1 className="mintAmount">{mintAmount}</h1>
                <svg onClick={incrementMintAmount} xmlns="http://www.w3.org/2000/svg" className="SVG" viewBox="0 0 24 24" fill="000"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                </div>
                <h4>Max Mint Amount: {maxMintAmount}</h4>
                <div className="costDiv">
                  <h4>
                    <span>Cost = {Number.parseFloat(cost * mintAmount).toFixed(4)} ETH + Gas</span>
                  </h4>
                </div>
                <div className='buttonContainer'>
                  <ConnectButton />
                  { account.isConnected? <button className='mintButton' disabled={isMinting} onClick={
                    isOGstate && isValidOGUser && numberMinted < config.MAX_MINT_OG ? OGMintHandler : isWLState && isValidWLUser && numberMinted < config.MAX_MINT_WHITELIST ? WlMintHandler : publicMintHandler
                    }>{isMinting ? 'Busy...' : 'Mint'}</button> : <></>}
                </div>
                {status && success ?
                (<div className='statusSuc'><h4>{status}</h4> </div>) :
                status && !success ?
                (<div className='statusFail'><h4>{status}</h4> </div>):
                <></>
                }                                             
              </div>
              <img className="gif" src='config/images/BoobyB.gif'/>
              </div>
            </div>
            <h3 className="font-Besty"></h3>
          </div>
        
    </>
  )
}

export default Mint
