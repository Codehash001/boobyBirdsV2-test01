import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

// Components
import Hamburger from "./Hamburger";
import Navbar from "./Navbar";

export const HeaderSubItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    align-self: left;

    transition: all ease-in-out 300ms;
    @media (max-width: 950px) {
      background: var(--primary);
      width: 100%;

      justify-content: left;
      
      flex-direction: column;
      position: absolute;
      padding-top: 8px;
      align-items: center;
      left: -2px;
      font-size: 2.2em;
}
`

export const HamburgerMenu = styled.div`
    width: 30px;
    display: none;
    
    @media (max-width: 950px) {
      display: flex;
      flex-direction: column;
`

//From Template

export const StyledImgBanner = styled.img`
  width: 100%;
`;

export const StyledImgSmall = styled.img`
  width: 22px;
`;

export const StyledLink2 = styled.a`
  color: white;
  text-decoration: none;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ease-in-out 500ms;
  font-size:0.7em;

  height: 30px;
  padding: 8px 14px;
  :hover{
    background-color: gray;
    
  }
  @media (max-width: 700px) {
    margin-bottom: 15px;
}
`;

const Header = () => {

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  return (
    <div className='header'>
      <div className="headerItems">

        <HeaderSubItems className="bbb">

          {/* <Navbar /> */}

          <StyledLink2 target={"_blank"} href="https://discord.gg/boobybirds" >
            <StyledImgSmall alt={"example"} style={{ margin: 0, marginRight: "4px" }} src={"/config/images/discord_logo.png"} />
          </StyledLink2>

          <StyledLink2 target={"_blank"} href="https://www.instagram.com/boobybirds" >
            <StyledImgSmall alt={"example"} style={{ margin: 0, marginRight: "4px" }} src={"/config/images/ig_logo.png"} />
          </StyledLink2>

          <StyledLink2 target={"_blank"} href="https://twitter.com/BoobyBirdsNFT" >
            <StyledImgSmall alt={"example"} src={"/config/images/twitter_logo.png"} />
          </StyledLink2>

        </HeaderSubItems>


        <HamburgerMenu>
          <div className="hamburger" onClick={toggleHamburger}>
            <Hamburger isOpen={hamburgerOpen} />
          </div>
        </HamburgerMenu>

      <a className="brand_logo_a" href="/">
        <img className="brand_logo" alt={"logo"} src={"/config/images/logo.png"} />
        </a> 

        <div className="header_p">
          <p><a style={{textDecoration:'none'}} href="/mint">Buy/Mint</a></p>
        </div>

      </div>



      <style jsx="true">{`
        .bbb{
          top: ${hamburgerOpen ? '80px' : '-180px'};
          width: ${hamburgerOpen ? '101.2%' : '33%'};
          display: flex;
          justify-content: start;
        }
        .header{
          border-bottom-left-radius: ${hamburgerOpen ? '0' : '20px'}; 
          border-bottom-right-radius: ${hamburgerOpen ? '0' : '20px'}; 
        }
      `}

      </style>
    </div>
  )
}

export default Header