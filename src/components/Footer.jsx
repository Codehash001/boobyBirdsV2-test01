import React, { useState } from "react";
import Subscribe from "./Subscribe";

const Footer = () => {

  // To copy the email to the clipboard when clicking
const copyToClipboard = () => {
  navigator.clipboard.writeText('collabs@BB.club')
}

// To show a message when hovering contact
const [isHovering, setIsHovering] = useState(false);

const handleMouseOver = () => {
  setIsHovering(true);
};

const handleMouseOut = () => {
  setIsHovering(false);
};


  return (
    <div className="footer_wrapper">
      <div className="footer_img">
        <img src="/config/images/footer_img.png" alt="footer img" />
      </div>
      <div className="footer">
        <div className="footer_left">
          <div className="footer_text">
            <h3>BOOBY BIRDS</h3>
            <p>Flaunt what you got.</p>
          </div>
          <div className="footer_socials">
            <a href="https://discord.gg/boobybirds">
              <img src="/config/images/discord_footer.png" alt="" />
            </a>
            <a href="https://www.instagram.com/boobybirds">
              <img src="/config/images/ig_footer.png" alt="" />
            </a>
            <a href="https://twitter.com/BoobyBirdsNFT">
              <img src="/config/images/twitter_footer.png" alt="" />
            </a>
          </div>
        </div>
          <div className="footer_menu">
            <Subscribe />
          </div>
        <div className="footer_links">
          {/* <ul className="footer_menu">
            <li>
              {isHovering && (
                <p
                  style={{ position: "absolute", bottom: "50px", left: "30%" }}
                >
                  Click to copy
                </p>
              )}
              Contact Us:{" "}
              <button
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={copyToClipboard}
                style={{
                  fontSize: "1em",
                  border: "none",
                  background: "none",
                  color: "white",
                  cursor: "copy",
                }}
              >
                collabs@BB.club
              </button>
            </li>
            <li>
              <a href="#">Partnerships</a>
            </li>
          </ul> */}
          <ul className="footer_menu">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#vision">Vision</a>
            </li>
          </ul>
          <ul className="footer_menu">
            <li>
              <a href="#roadmap">Roadmap</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#faq">Faq</a>
            </li>
          </ul>
          <p>
              <a href="/config/images/terms_conditions.pdf">Terms and Conditions</a>
            </p>
        </div>
      </div>
      <p className="footer_copyright">Copyright Wrinkled Brains LLC</p>
    </div>
  );
};

export default Footer;
