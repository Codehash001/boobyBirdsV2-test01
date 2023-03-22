import React, { useState, useEffect } from 'react';
import Subscribe from "./Subscribe";

const Popup = ({waitBeforeShow = 1500}) => {

    const [showing, setShowing] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowing(true);
      }, waitBeforeShow);
  
      return () => clearTimeout(timer);
    }, [waitBeforeShow]);

    function handleShowing(){
        setShowing(false);
    }



  return (
    <div className='popup_pre_wrapper'>
        {showing ? <div className='popup_wrapper'><Subscribe/> <button className='popup_button' onClick={handleShowing}>X</button></div>
        : null}
    </div>
  )
}

export default Popup