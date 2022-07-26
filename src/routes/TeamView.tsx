import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {Serie, Team, Roster, RosterPlayer, Player} from '../interfaces'


import PlayerCard from '../components/PlayerCard/PlayerCard'
import SeriesCard from '../components/SeriesCard/SeriesCard';

const TeamView: React.FC = () => {
    const {teamid} = useParams()

    const [team, setTeam] = useState<Team>(Object)
    const [players, setPlayers] = useState<Player[]>([])
    const [matches, setMatches] = useState<Serie[]>([])
    const [rosterID, setRosterID] = useState<number>(0)
    

    const [hasLoaded, setHasLoaded] = useState<Boolean>(false)
    
    useEffect(() => {
        const teams_get = axios.get('../teams.json')
        const rosters_get = axios.get('../rosters.json')
        const players_get = axios.get('../players.json')
        const matches_get = axios.get('../series.json')

        axios.all([teams_get, rosters_get, players_get, matches_get]).then(axios.spread((...responses) => {
            const teamResp = responses[0].data
            const rosterResp = responses[1].data
            const playerResp = responses[2].data
            const matchesResp = responses[3].data

            
            const roster: Roster = rosterResp.find((roster:Roster) => roster.team.id === parseInt(teamid!))
            const lineup: RosterPlayer[] = roster.line_up.players
            setRosterID(roster.id)

            setTeam(teamResp.find((team:Team) => team.id === parseInt(teamid!)))
            setMatches(matchesResp.filter((match:Serie) => {
                for(let i = 0; i < match.participants.length; i++){
                    if(match.participants[i].roster.id === roster.id) return true
                }
                return false
            }))
            setPlayers(playerResp.filter((player:Player) => {
                for(let i = 0; i < lineup.length; i++){
                    if(lineup[i].id === player.id) return true
                }
                return false
            }))
            setHasLoaded(true)
        }))
    }, [])

    if(!hasLoaded){
        return (
            <div>Waiting for data</div>
        )
    }

    return (
        <div className="TeamContainerCenter"> 
            <div className="TeamContainer">
                <div className="TeamTopContainer">
                    <img src={team.images[0].url} />
                    <div>
                        <h1>{team.name}</h1>
                        <h2>DPC - {team.dpc_points}</h2>
                        <p>{team.region.name} - {team.region.country.name}</p>
                        <img src={team.region.country.images[0].url} />
                    </div>
                </div>
                <div className="playerContainer">
                    {players.map(player => 
                        <PlayerCard key={player.id} playerData={player} />
                    )}
                </div>
                <div className="seriesContainer">
                    <div className="seriesListContainer">
                        <p><b>Played Matches</b></p>
                        {matches.filter((match:Serie) => match.lifecycle !== "upcoming").map(match => 
                            <SeriesCard 
                                key={match.id} 
                                seriesData={match} 
                                rosterID={rosterID} 
                                hasPlayed={true} 
                                draw={match.lifecycle === 'over-draw'}/>
                        )}
                    </div>
                    <div className="seriesListContainer">
                        <p><b>Upcoming Matches</b></p>
                        {matches.filter((match:Serie) => match.lifecycle === "upcoming").map(match => 
                            <SeriesCard 
                                key={match.id} 
                                seriesData={match} 
                                rosterID={rosterID} 
                                hasPlayed={false}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamView;