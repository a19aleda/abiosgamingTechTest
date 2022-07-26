import React, {useEffect, useState} from 'react';
import './App.css';
import {Team} from './interfaces'
import axios from 'axios'

import TeamCard from './components/TeamCard/TeamCard'


const App: React.FC = () => {

  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    axios.get('teams.json').then(res => {
      const sortedTeams: Team[] = res.data.sort((team1: Team, team2: Team) => {
        if(team1.dpc_points < team2.dpc_points) return 1
        if(team1.dpc_points > team2.dpc_points) return -1
        return 0
      })
      setTeams(sortedTeams)
    })
  }, [])

  const isSecured = (dpc_points: number):boolean => {
    return dpc_points >= 500
  }

  const isQualified = (rank: number):boolean => {
    return rank <= 3
  }


  return (
    <div className="App">
      <h1>Dota 2</h1>
      <h2>Pro Circuit Season Standing</h2>
      <div className="teamsContainer">
        {teams.map((team, index) =>  
          <TeamCard 
            key={team.id} 
            team={team}
            rank={index+1}
            secured={isSecured(team.dpc_points)}
            qualified={isQualified(index)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
