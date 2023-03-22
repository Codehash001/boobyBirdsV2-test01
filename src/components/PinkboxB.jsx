import React from 'react';

function Pinkbox(props){
  return (
    <div className='pinkbox_wrapper'>
       <div className="pinkbox_titleB">
       <span className='numbers'>{props.number}</span>{props.title}
        </div>
        
        <div className="pink_box_side_imgB">
         <img src={"/config/images/roadmap/" + props.img + ".png"} alt="" />
       </div>

       <div className="pinkbox_text">
        {props.text}
       </div>
    </div>
  )
}

export default Pinkbox;