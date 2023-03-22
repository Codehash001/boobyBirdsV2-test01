import React, { useEffect, useState, useRef } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import * as s from "./styles/globalStyles";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import Popup from "./components/Popup";
import Terms from "./components/Terms";

import ComingSoon from "./components/ComingSoon";

function App() {
  return (
    <s.Screen>
      <Routes>n
      {/* Temporarily disabled Home for PRE LAUNCH */}
        {/* <Route path="/" exact={true} element={<HomeBeforeLaunch/>}/> */}


      {/* REAL HOME - Uncomment for launch */}
        <Route path="/" exact={true} element={<Home/>}/>
        <Route path="mint" exact={true} element={<Mint/>}/>

        <Route path="popup" exact={true} element={<Popup/>}/>
        <Route path="terms" exact={true} element={<Terms/>}/>
      


        <Route path="/comingsoon" exact={true} element={<ComingSoon/>}/>

        <Route path="*" element={<ComingSoon/>}/>
        
      </Routes>
    </s.Screen>
  );
}

export default App;