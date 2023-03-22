import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import * as s from "../styles/globalStyles";
import styled from "styled-components";
import { ethers } from "ethers";

// Here you may use two variables, 1 for OG and 1 for WL
// OG
import { whitelist } from "../wl/whitelist.js";
// WL
import { whitelist2 } from "../wl/whitelist2.js";

// OG
import { WHITELISTED_WITH_MERKEL_TREE } from "../wl/whitelistKeys.js";
// WL
import { WHITELISTED_WITH_MERKEL_TREE2 } from "../wl/whitelistKeys2.js";

// Styled
export const RowElement = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.4em;
  font-weight: 600;
  color: var(--accent-text);
  border-bottom: 1px solid white;
  width: 100%;
  text-align: center;

  margin: 20px 0;
  padding-bottom: 10px;
`;

//From Template

export const StyledButton = styled.button`
  padding: 5px 10px;
  border-radius: 7px;
  border: none;
  background: var(--gradient-yellow);

  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 120px;
  transform: scale(1.3);
  cursor: pointer;
  transition: all ease-in-out 400ms;
  :hover {
    transform: scale(1.4);
  }
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10%;
  border: none;
  background-color: var(--primary);
  height: 30px;
  width: 30px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  width: 100%;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

const Mint = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    WEI_COST_WL: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  // CLAIM NFT PUBLIC SALE - In case your Minting function, Whitelist minting function 
  // or OG function have other names, change them on each of the following functions:
  //claimNFTs for normal Mint, claimWhitelistNFT for whitelist and claimOgNFT for OG and adapt arguments acordingly.
  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);

    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);

    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback(
          "Sorry, something went wrong please try again. You might have rejected the transaction."
        );
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(`You have succesfully claimed your ${CONFIG.NFT_NAME}.`);
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  // CLAIM WL NFT
  const claimWhitelistNFT = () => {
    let cost = CONFIG.WEI_COST_WL;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    let numberOfWLNfts = 1;
    let whitelistKeysFile = {};
    let feedback = '';

    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);

    // The IF is to avoid calling the smart contract if the user is not WL
    if (
      whitelist2.includes(ethers.utils.getAddress(blockchain.account))) {
      whitelistKeysFile = WHITELISTED_WITH_MERKEL_TREE2;
      numberOfWLNfts = mintAmount;
      feedback = `You have succesfully claimed ${numberOfWLNfts} ${CONFIG.NFT_NAME} as whitelisted user.`;
      console.log('found in whitelist 2');

      setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
      setClaimingNft(true);

      let totalGasLimit = String(gasLimit * numberOfWLNfts);

      blockchain.smartContract.methods
        .mintWhitelist2(mintAmount, whitelistKeysFile[ethers.utils.getAddress(blockchain.account)])
        .send({
          gasLimit: String(totalGasLimit),
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        .once("error", (err) => {
          console.log(err);
          setFeedback(
            "Sorry, something went wrong please try again. You might have rejected the transaction."
          );
          setClaimingNft(false);
        })
        .then((receipt) => {
          console.log(receipt);
          setFeedback(`You have succesfully claimed your whitelisted ${CONFIG.NFT_NAME}.`);
          setClaimingNft(false);
          dispatch(fetchData(blockchain.account));
        });
    }
    else {
      setFeedback('You are not in the Whitelist');
    }
  };

  // CLAIM OG NFT
  const claimOgNFT = () => {
    let cost = 0;
    let gasLimit = CONFIG.GAS_LIMIT;
    let numberOfWLNfts = 1;
    let totalCostWei = String(cost * 1);

    let whitelistKeysFile = {};
    let feedback = '';

    setFeedback(`Minting your Whitelist ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);

    // The IF is to avoid calling the smart contract if the user is not OG
    if (
      whitelist.includes(ethers.utils.getAddress(blockchain.account))) {
      whitelistKeysFile = WHITELISTED_WITH_MERKEL_TREE;
      feedback = `You have succesfully claimed 1 ${CONFIG.NFT_NAME} as OG user.`;
      console.log('found in whitelist 1 OG');

      let totalGasLimit = String(gasLimit * numberOfWLNfts);

      blockchain.smartContract.methods
        .mintWhitelist(
          whitelistKeysFile[
            ethers.utils.getAddress(blockchain.account)
          ]
        )
        .send({
          gasLimit: String(totalGasLimit),
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        .once("error", (err) => {
          console.log(err);
          setFeedback(
            "Sorry, something went wrong please try again. You migth have already claimed your Whitelist NFT."
          );
          setClaimingNft(false);
        })
        .then((receipt) => {
          console.log(receipt);
          setFeedback(feedback);

          setClaimingNft(false);
          dispatch(fetchData(blockchain.account));
        });
    }
    else{
      setFeedback('You are not in the OG List');
    }


  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };
  const setMaxMintAmount = () => {
    setMintAmount(10);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  // unmute vid
  const [mutedVid, setMutedVid] = useState(true);
  const handleMutedVid = () => {
    video.muted = !video.muted;
    setMutedVid(!mutedVid);
  };

  return (
    <ResponsiveWrapper className="mint_pre_wrapper">
      <div className="mint_homelink">
        <a href="/">Home</a>
        <a href="/mint#mint">Mint</a>
      </div>

      <div className="mint_wrapper">
        <div className="mint_l">
          {/* <img src="/config/images/mintimg.jpeg" alt="" /> */}
          <div className="video_wrapper">
            <div className="mint_soundlink">
              <button className="soundlink_button" onClick={handleMutedVid}>
                <img src="config/images/volume.png" alt="" />
              </button>
            </div>

            <video className="VideoTagHome" id="video" autoPlay loop muted>
              <source
                src={"./config/images/vid/Web3_cartoon.mp4"}
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className="mint_r">
          <h3 className="mint_date">MINT DATE: March 2023. STAY TUNED!</h3>

          <div className="mint_box" id="mint">
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                    borderBottom: "1px solid white",
                    width: "80%",
                  }}
                >
                  Sold Out!
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Secondary sales {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>

                    <s.SpacerSmall />
                    <StyledButton
                      id="connect_btn"
                      // disabled={true}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      {/* MINT SOON*/} CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}

                    <s.SpacerMedium />

                    {/* <p>Use <a href="https://ethereumprice.org/gas/" target={"blank"}>this tool</a> to track GAS prices</p> */}
                  </s.Container>
                ) : (
                  <>
                    <p
                      style={{
                        fontSize: 30,
                        fontWeight: "600",
                        marginTop: "20px",
                      }}
                    >
                      MINT
                    </p>
                    <RowElement>
                      Total: {data.totalSupply} of {CONFIG.MAX_SUPPLY}
                    </RowElement>

                    {/* Select Quantity */}
                    <RowElement>
                      <p>Quantity</p>
                      <s.SpacerMedium />

                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                          marginBottom: "0px",
                          fontFamily: "Balsamiq Sans",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>

                      <s.SpacerMedium />

                      <StyledRoundButton
                        style={{
                          lineHeight: 0.4,
                          fontFamily: "Kiddos",
                          fontSize: "0.8em",
                        }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          setMaxMintAmount();
                        }}
                      >
                        Max
                      </StyledRoundButton>

                      {/* <button
                        className="max_btn"
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          
                        }}
                      >
                        Max
                      </button> */}
                    </RowElement>
                    {/* Price */}
                    <RowElement>
                      Total Cost: {(CONFIG.DISPLAY_COST * mintAmount).toFixed(3)}{" "}
                      {CONFIG.NETWORK.SYMBOL}
                    </RowElement>

                    {/* ALERT 1 & 2 */}

                    <s.SpacerSmall />
                    {/* {blockchain.account!=null && whitelist.includes(
                      ethers.utils.getAddress(blockchain.account)
                    ) ||  
                    blockchain.account!=null && whitelist2.includes(
                      ethers.utils.getAddress(blockchain.account)
                    ) ? (
                      <s.Container
                        style={{ marginBottom: "10px" }}
                        ai={"center"}
                        jc={"center"}
                        fd={"row"}
                      >
                        <StyledButton
                          style={{
                            background: "white",
                            color: "black",
                            width: "80%",
                          }}
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            // claimWhitelistNFT();
                            getData();
                          }}>
                          {claimingNft ? "BUSY" : "Whitelist MINT"}
                        </StyledButton>
                      </s.Container>
                    ) : null} */}
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>

                    {/* MINT buttons */}
                    <div className="mint-btns">

                      {/* WL Mint */}
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        style={{
                          marginTop: "20px",
                          fontFamily: "Kiddos",
                          fontSize: "1.5em",
                          letterSpacing: "0.1em",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          claimWhitelistNFT();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "WL MINT"}
                      </StyledButton>

                      {/* Regular MINT */}
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        style={{
                          marginTop: "20px",
                          fontFamily: "Kiddos",
                          fontSize: "1.5em",
                          letterSpacing: "0.1em",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "PUBLIC MINT"}
                      </StyledButton>

                      {/* OG MINT */}
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        style={{
                          marginTop: "20px",
                          fontFamily: "Kiddos",
                          fontSize: "1.5em",
                          letterSpacing: "0.1em",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          claimOgNFT();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "OG MINT"}
                      </StyledButton>

                      <s.SpacerMedium />
                    </div>
                    {/* Display Wallet */}

                    {/* ALERT 3 */}

                    {/* {blockchain.account!=null ? 
                    <div><p>You're connected with:</p>{ethers.utils.getAddress(blockchain.account)}</div>
                    :
                    null  
                  } */}

                    {/* {ethers.utils.getAddress(blockchain.account)} */}
                    {/* {WHITELISTED_WITH_MERKEL_TREE[ethers.utils.getAddress(blockchain.account)]} */}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ResponsiveWrapper>
  );
};

export default Mint;
