import React from 'react';

function TeamMember(props){
    return (
        <div className="member_item">
            <div className="member_img"><img src={props.teamImg} alt="member img" /></div>

            <div className="member_container">
                <h3>{props.name}</h3> 
                
            </div>

            <p className='team_role'>{props.role}</p>
            
            <div className="team_links">
                <a href={props.link}><img src={props.img} alt="" /></a>
                <a href={props.link}><img src={props.img2} alt="" /></a>
            </div>
            
            <p className='team_desc'>{props.description}</p>
        </div>
    )
}

export default TeamMember;