import { server } from "typescript"

//Team Interfaces
export interface Team {
    "id": number,
    "name": string,
    "abbreviation": string,
    "dpc_points": number,
    "also_known_as": string[],
    "deleted_at": string | null,
    "active": Boolean,
    "images": Image[],
    "region": TeamRegion,
    "social_media_accounts": SocialMediaAccount[],
    "standing_roster": StandingRoster,
    "game": Game,
    "organisation": Organisation
}

export interface TeamRegion {
    "id": number,
    "name": string,
    "abbreviation": string,
    "country": Country  
}

export interface Country {
    id: number, 
    name: string, 
    abbreviation: string
    images: Image[]
}

export interface Image {
    "id": number,
    "type": string,
    "url": string,
    "thumbnail": string,
    "fallback": Boolean
}

export interface SocialMediaAccount {
    "handle": string,
    "url": string,
    "platform": SocialMediaAccountPlatform
}

export interface SocialMediaAccountPlatform {
    id: number,
    name: string,
    slug: string
}

export interface StandingRoster {
    "id": number,
    "from": string,
    "to": string | null,
    "roster": TeamRoster
    "deleted_at": string | null
}

export interface TeamRoster {
    id: number
}

export interface Game {
    id: number
}

export interface Organisation {
    id: number
}

//End of team interfaces

//Roster Interfaces
export interface Roster {
    id: number,
    team: RosterTeam,
    line_up: RosterLineup,
    game: Game
}

export interface RosterTeam {
    id: number
}

export interface RosterPlayer {
    id: number
}

export interface RosterLineup {
    id: number,
    players: RosterPlayer[]
}

//End of Roster Interfaces

//Player Interfaces
export interface Player {
    id: number,
    first_name: string,
    last_name: string,
    nick_name: string,
    also_known_as: string[],
    age: PlayerAge,
    deleted_at: number | null,
    active: boolean,
    images: Image[],
    region: TeamRegion,
    game: Game,
    race: null,
    role: PlayerRole,
    teams: PlayerTeam[],
    social_media_accounts: SocialMediaAccount[]
}

export interface PlayerAge {
    precision: string,
    years: number
}

export interface PlayerRole {
    id: number
}

export interface PlayerTeam {
    id: number
}

//End of player interface

//Series Interfaces
export interface Serie {
    id: number,
    title: string,
    start: string,
    end: string | null,
    postponed_from: string | null,
    deleted_at: null,
    lifecycle: string,
    tier: number,
    best_of: number,
    chain: string[],
    streamed: boolean,
    bracket_position: BracketPosition | null,
    participants: Participant[],
    tournament: SeriesTournament,
    substage: SeriesSubstage,
    game: Game,
    matches: SeriesMatches[],
    casters: SeriesCaster[],
    has_incident_report: boolean,
    coverage: SeriesConverage,
    format: Format
}

export interface BracketPosition {
    part: string,
    col: number,
    offset: number
}

export interface Participant {
    seed: number,
    score: number,
    forfeit: boolean,
    roster: ParticipantRoster
    winner: boolean,
    stats: null
}

export interface ParticipantRoster {
    id: number
}

export interface SeriesTournament {
    name: string,
    id: number
}

export interface SeriesSubstage {
    id: number
}

export interface SeriesMatches {
    id: number
}

export interface SeriesCaster {
    primary: boolean,
    caster: SeriesCasterID
}

export interface SeriesCasterID {
    id: number
}

export interface SeriesConverage {
    data: SeriesCoverageContainer
}

export interface SeriesCoverageContainer {
    live: SeriesCoverageDataTypes,
    realtime: SeriesCoverageDataTypes,
    postgame: SeriesCoverageDataTypes
}

export interface SeriesCoverageDataTypes {
    api: SeriesCoverageData,
    server?: SeriesCoverageData,
    cv?: SeriesCoverageData
}

export interface SeriesCoverageData {
    expectation: string,
    fact: string
}

export interface Format {
    best_of: number
}

