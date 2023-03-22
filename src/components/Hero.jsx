import React from "react";

const Hero = () => {
  return (
    <div className="hero_wrapper">
      <div className="hero">
        <img className="hero_main_img" src="/config/images/website_banner_full.png" alt="hero img" />
        <img className="hero_main_img2" src="/config/images/website_banner_full2.png" alt="hero img" />
      </div>

      <div className="home_first_row">
        <div className="hero_container">
          <h2 className="main_h2">
            {/* MEET THE <span className="multicolor_h2">BOOBY BIRDS</span> */}
          </h2>
        </div>

        <div className="home_first_row_container">
          <img className="boobies_bg" src="/config/images/boobies.png" alt="" />

          <div className="first_row_right">
            <img src="/config/images/about-img.png" alt="animated gif" />
          </div>
          <div className="first_row_left">
            <h2 className="main_h2">MEET THE BOOBY BIRDS</h2>
            <p style={{fontSize:'1.8em'}}>
            Booby Birds is more than an NFT collection. It’s a movement that fights 
            violence against women. <span className="numbers_black">(</span>Also, bras are uncomfortable<span className="numbers_black">)</span> For our mothers, 
            sisters, aunts, besties…this is a project to aid women around the globe. 
            We’d love to be your first NFT! - Xoxo, Booby Fam

            {/* Booby Birds is a female-led NFT project (which makes sense, let's be honest), 
            with a definitive vision of creating something fun and meaningful 
            for web<span className="numbers_black">3</span>. Using the connectivity 
            of NFT technology, we want to work towards a shared vision; one that 
            has global implications... */}
            </p>
            <a className="call_to_action" href="https://discord.gg/boobybirds">
              Join Our Discord
            </a>
            {/* <Mint /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
