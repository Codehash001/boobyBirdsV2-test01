import React, { useState } from "react";
import cx from "classnames";
import PinkA from "./PinkA";

const About = ({ open = false, isToggled, onToggle }) => {

  const aboutCollapse = cx("about2", {
    open: open,
  });

   // unmute vid
   const [mutedVid, setMutedVid] = useState(true);
   const handleMutedVid = ()=>{
     setMutedVid(!mutedVid);
   }
 

  return (
    <div className="about_wrapper">

      <div className="about_img_container">
        <img className="about_main_img" src="/config/images/about_separator.png" alt="hero img" />
      </div>

      <div className="about_container">

        <div className="about_text">
          <h2>WHAT IS THAT VISION?</h2>
          <p className="about2">
            It's quite simple, really. Our vision can be split into two branches:
          </p>
        </div>

        <div className="vision_container">
          <div className="vision_element">
            <div className="floating_box fl_bl">
              <p>Promoting female excellence</p>
            </div>
            <div className="bottom_box">
              <p>
              We’re Booby Birds for a reason. We think it’s important to flaunt what makes women unique. It isn’t all about the boobs, but we’re using it as a catalyst to change the world.
                </p>
            </div>
          </div>
          <div className="vision_element">
            <div className="floating_box fl_br">
              <p>Bringing the world together</p>
            </div>
            <div className="bottom_box" style={{lineHeight: '1.8em'}}>
              <p>
              Female empowerment should be group effort. We want equality. We are going to build women up. We are going to support them in every way.
                </p>
            </div>
          </div>
        </div>

        <p className="about_bottom_p">Those branches each stem from the same tree, and the Booby Birds are nesting comfortably within it. But there's room for more of us...</p>

      </div>

      <div className="about_container2">
        
          {/* <img className="blue_img_img" src="/config/images/blue-losange.png" alt="" /> */}
          {/* <img className="planet" src="/config/images/planet.png" alt="" /> */}
          <img className="wood_sign" src="/config/images/wood_sign.png" alt="" />
       <div className="blue_div_bg_cover"></div>
        <h2 className="about_container2_h2">WHAT'S IN IT FOR YOU?</h2>

          {/* <div className="video_wrapper">
            <div className="mint_soundlink">
              <button className="soundlink_button" onClick={handleMutedVid}><img src="config/images/volume.png" alt="" /></button>
            </div>

            <video className='VideoTagHome' id="video" autoPlay loop muted >
              <source src={"./config/images/vid/Web3_cartoon.mp4"} type='video/mp4'/>
            </video>
          </div> */}

        <div className="about_text2">
          <p className="about2">
          “We’re not going to promise you the world. But we are promising that we will try to make this world a better place to live in both physically and digitally”
          </p>
          <p className="about2">
          Our utilities have been designed to line up with our vision and values.
          </p>
          <p className="about2">
          Here’s just a few:
          </p>
          <p className="about2">
            <li>
              <span className="numbers">-10%</span> of mint funds will go to charities that help woman across the globe across all fields of female endeavour
            </li>
            <li><span className="numbers">-25%</span> of mint funds will be going towards acquisition and development of land in the metaverse.We plan on building a virtual theme park called Booby World.</li>
<li>-Holders get lifetime access to a central hub to be a part of future decisions.This doesn’t even scrape the surface...</li>
          </p>
        </div>

        
      </div>

      

    </div>
  );
};

export default About;
