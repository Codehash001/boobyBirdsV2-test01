import React, { useEffect, useState, useRef } from "react";
import * as s from "../styles/globalStyles";
import ClipLoader from 'react-spinners/ClipLoader';

import Header from "../components/Header";
import Hero from "../components/Hero";
import HeroB from "../components/HeroB";
import About from "../components/About";
import AboutB from "../components/AboutB";
import Team from "../components/Team";
import Faq from "../components/Faq";
import Popup from "../components/Popup";
import Footer from "../components/Footer";

const Home = ({waitBeforeShow = 1300}) => {

  const [showing, setShowing] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowing(true);
      }, waitBeforeShow);
  
      return () => clearTimeout(timer);
    }, [waitBeforeShow]);

  return (
    <div>
      {showing ? 
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 0, background: "var(--primary)" }}>
       
        <Header/>

        <Popup/>

        <Hero/>

        <About/>

        <HeroB/>

        <AboutB/>

        {/* <Roadmap id="roadmap"/> */}

        <Team/>

        <Faq/>

      </s.Container> : <div className="loading"><p style={{marginBottom:'150px'}}>Loading...</p><ClipLoader color={'#fff'} size={150} />
</div>}

      {showing ? <Footer/> : null } 
    </div>
  );
};

export default Home;