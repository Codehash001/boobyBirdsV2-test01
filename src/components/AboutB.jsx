import React, { useState, useRef, useEffect } from "react";

import cx from "classnames";
import Pinkbox from "./Pinkbox";
import PinkboxB from "./PinkboxB";
import PinkA from "./PinkA";

const AboutB = ({ open = false, isToggled, onToggle }) => {
  const aboutCollapse = cx("about2", {
    open: open,
  });

  const [aboutTextBExpanded, setAboutTextBExpanded] = useState(false);

  const expandTextB = () =>{
    setAboutTextBExpanded(!aboutTextBExpanded);
  }

  // unmute vid
  const ref = useRef(null);

  useEffect(()=>{
    const video2 = document.getElementById('video2');
  })
  

  const [mutedVid2, setMutedVid2] = useState(true);
  const handleMutedVid2 = ()=>{
    setMutedVid2(!mutedVid2);
  }

  return (
    <div className="about_wrapperB">

      <div className="about_img_container">
        <img className="about_main_img" src="/config/images/about_separator2.png" alt="hero img" />
      </div>

      <div className="about_containerB">

        <div className="about_textB">
          <h2>OUR STORY</h2>
          {/* <p className="about2" style={{color:'black'}}>
          They came at a time when the world was full of stress. A wave of anger and frustration had spread across global communities, turning people against one another for ridiculous reasons. Women faced unfair expectations, and bras were becoming uncomfortable - someone had to do something. 
          The dire state of things was being witnessed by many, but there was one group who took it upon themselves to make a difference. Sat atop a large mulberry tree lived a colorful flock of Booby Birds. These beautiful pink souls were free-spirited, and seriously affected by what was happening below them. They had to find a way to bring the people of the world together, to inject some joy into everyday life. And with that thought, the dream of a Booby World became a working reality.  
          </p> */}

        <button onClick={expandTextB} className="pink_button">
          {aboutTextBExpanded ? 'Read Less' : 'Read Story'}
        </button>


          {aboutTextBExpanded ? <div  className="about2" style={{color:'black'}}>
            <p>  
              They came at a time when the world was full of stress. A wave of anger and frustration had spread across global communities, turning people against one another for ridiculous reasons. Women faced unfair expectations, and bras were becoming uncomfortable - someone had to do something.
              The dire state of things was being witnessed by many, but there was one group who took it upon themselves to make a difference. Sat atop a large mulberry tree lived a colorful flock of Booby Birds. These beautiful pink souls were free-spirited, and seriously affected by what was happening below them. They had to find a way to bring the people of the world together, to inject some joy into everyday life. And with that thought, the dream of a Booby World became a working reality.
            </p>
   
         <br />

          <p>
          They moved to the beach, and began working on their safe haven roaming around the beach topless; to promote real freedom and inclusivity. The booby birds threw rave parties for everyone, gave surfing lessons, and built a delicious hotdog restaurant. It gave people hope that the world could be chill again.
            Their immaculate vibes were infectious, and those who came to Booby World often stayed, entranced by the bubble of fun that the Booby Birds had created. But even with their community in full-swing, they knew they wanted more. They were eager to cater to people all over the world, to help the ones that couldn’t make it to the beach.
              Booby World was to become a virtual world where dreams become reality, and fun is without limits. They wanted to create a safe space that anyone could access, from wherever they were, to experience a more positive environment where everyone shared important values. They were confident that this world could be fun again, free from struggle and inequality, and they were sure that they could contribute to that. If all it took was the creation of a virtual world, and getting their Boobies out - well, that doesn’t sound bad at all. Does it?
          </p>

          <div className="video_wrapper">
            <div className="mint_soundlink">
              <button className="soundlink_button" onClick={handleMutedVid2}><img src="config/images/volume.png" alt="" /></button>
            </div>

            <video className='VideoTagHome' id="video2" autoPlay loop muted >
              <source src={"./config/images/vid/read_our_story_vid.mp4"} type='video/mp4'/>
            </video>
          </div>
 </div> : null}
          
        </div>
        
       
      </div>

      <div className="roadmap">
        
        <h2 className="about_container2_h2">ROADMAP</h2>

        <Pinkbox number="01 " title="The Breast Start" img="1" text="Our initial step is all about getting the Booby Birds on the map, for the world to see in all their glory. We'll start by spreading our message on social media, starting up our Discord and releasing sneak peeks of our artwork. A little nip slip, so to speak. Once we've reached this stage, we'll begin hosting regular competitions and giveaways to reward our budding Birds."/>
        <PinkboxB number="02 " title="The First Tweak" img="2" text="We've got to get those perky pets excited, which is why the release of our website will kick start another stage of growth for our community. We'll solidify our goals and values, and release important information such as collection size, mint price, and whitelist details. Early arrivals to the Booby brigade will be able to claim whitelist spots."/>
        <Pinkbox number="03 " title="Free the Nip" img="3" text="The Booby Birds mint will take place over a presale and a public mint. Whitelisted members of our community will get a tasty discount, because that's the way it should be. Upon sellout of our collection, we'll release donation receipts to show that we weren't messing around. This is where the fun really begins, as we hatch the plans for one of the best virtual experiences on the blockchain."/>
        <PinkboxB number="04 " title="Calm Your Tits" img="4" text="We know, the prospects of breast-related NFT utilities are quite exciting, but you don't need to lose control. Whether it's the release of the Booby Bonfire, or the commencement of work on our Booby Birds cartoon pilot, we'll make sure we're always keeping you in the loop. As you soak things up along the way, we'll be working hard to our final nesting place - Booby World."/>
        <Pinkbox number="05 " title="There's more" img="5" text="We're committed to helping women in whatever way we can, which we'll be doing through regular donations. But we're also keen on showing the varying nature of our breasts; they don't all just come in one variety - just like our NFTs. Our second collection, 3D Booby Birds are a testament to that, and another way for everyone around the world to enjoy Booby Land - a Metaverse theme park, for everyone."/>

      </div>

      

    </div>
  );
};

export default AboutB;
