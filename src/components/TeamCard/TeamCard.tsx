import react from 'react'
import {Team} from '../../interfaces'
import { useNavigate } from "react-router-dom";


interface Props {
    team: Team,
    rank: number,
    secured: boolean,
    qualified: boolean
}

const TeamCard = ({team, rank, secured, qualified}: Props) => {
    const navigate = useNavigate()

    const gotoTeam = ():void => {
        navigate(`/teamview/${team.id}`)
    }
    
    return (
        
        <div className="teamCard" onClick={gotoTeam}>
            <div className="teamCard-rank">
                <p>{rank}</p>
            </div>
            <img src={team.images[0].thumbnail} />
            <div className="teamCardInfo">
                <p>{team.name}</p>
                <p>DPC - {team.dpc_points}</p>
            </div>
            {secured && 
            <div className="badge">Invitational Secured</div> }

            {(!secured && qualified) && 
            <div className="badge orange">Invitational Qualified</div> }
        </div>
        
    )
}

export default TeamCard