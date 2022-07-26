import axios from 'axios'
import { resourceLimits } from 'worker_threads'
import {Team} from './types'


export const getTeams = async (): Promise<Team[]> => {
    const teams: Team[] = []
    
    const result = await axios.get('teams.json')
    result.data.forEach((team: any) => {
        const tempTeam: Team = {
            id: team.id,
            name: team.name,
            dpc_points: team.dpc_points,
            team_image: team.images[0].url,
            team_image_thumbnail: team.images[0].thumbnail
        }
        teams.push(tempTeam)
    })
    return teams

}