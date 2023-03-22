import React from 'react';
import Hamburger from "./Hamburger";
import styled from "styled-components";


// Componentizar
export const HamburgerMenu = styled.div`
    width: 30px;
    display: none;
    
    @media (max-width: 700px) {
      display: flex;
      flex-direction: column;
`;

export const HeaderSubItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out 300ms;
    @media (max-width: 700px) {
      background: linear-gradient(to left, #c06c84, #6c5b7b, #355c7d);
      width: 100%;
      flex-direction: column;
      position: absolute;
      align-items: center;
      left: 0;
      font-size: 2.2em;
}
`;

export const SpanH = styled.div`
  width: 25px;
  height: 3px;
  margin: 2px auto;
  transition: all 0.3s ease-in-out;
  background: white;
  display: block;
  cursor: pointer;
  position: relative;
  top: 0;
`;

export const StyledImgSmall = styled.img`
  width: 22px;
`;

export const StyledLink2 = styled.a`
  color: white;
  text-decoration: none;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    margin-bottom: 15px;
}
`;


const HeaderItems = () => {
    return (
        <div className='headerItems'>
            <HeaderSubItems className="bbb">
                <StyledLink2 href={"#about"}>
                    About
                </StyledLink2>
                <StyledLink2 href={"#roadmap"}>
                    Roadmap
                </StyledLink2>
                <StyledLink2 target={"_blank"} href={"https://discord.com/invite/BB"}>
                    Discord
                </StyledLink2>

                <StyledLink2 target={"_blank"} style={{ border: "1px solid rgb(200,200,200", borderRadius: "6px", padding: "4px 8px" }} href={CONFIG.MARKETPLACE_LINK} >

                    <StyledImgSmall alt={"example"} style={{ margin: 0, marginRight: "4px" }} src={"https://testnets.opensea.io/static/images/logos/opensea.svg"} />
                    Opensea
                </StyledLink2>

            </HeaderSubItems>

            <HamburgerMenu>
                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen} />
                </div>
                {/* <SpanH></SpanH>
            <SpanH></SpanH>
            <SpanH></SpanH> */}
            </HamburgerMenu>

        </div>
    )
}

export default HeaderItems