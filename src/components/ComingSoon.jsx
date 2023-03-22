import React from 'react'

import Header from "./Header";
const ComingSoon = () => {
    return (
        <div className='d2e' style={{height:'100vh'}}>
            <Header/>

            <div className="spacer" style={{ height: "10px" }} />

            <div className="about_wrapper" style={{ borderTop: "none" }}>
                <h2 style={{fontSize: "3em"}} className='about_title'>COMING SOON</h2>
            </div>
           
        </div>
    )
}

export default ComingSoon;