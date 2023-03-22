import React from 'react';
import Collapsible from 'react-collapsible';

// TEST
import { teamMembers } from '../teamMembers';
import TeamMember from './TeamMember';

function Team() {
    return (
        <div id='team' className='team_container'>

            <h2 className='about_title'>Our Team </h2>

            <div className="team_members">

                {teamMembers.map((member, key) =>{
                    return <TeamMember teamImg={'/config/images/team/' + (key+1) + '.png'} name={member.name} link={member.link} img={member.img} img2={member.img2} role={member.role} description={member.description} key={key}/>
                })}
            </div>
        </div>
    )
}

export default Team;