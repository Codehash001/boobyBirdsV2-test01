import React from 'react'

function PinkA(props){
  return (
    <div className='pink_a' >
        <a style={{color:'white'}} href={props.link}> {props.text} </a>
        
    </div>
  )
}

export default PinkA