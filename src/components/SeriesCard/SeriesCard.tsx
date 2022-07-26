import {Participant, Serie} from '../../interfaces'

interface Props {
    seriesData: Serie
    rosterID: number,
    hasPlayed: boolean,
    draw?: boolean
}

const SeriesCard = ({seriesData, rosterID, hasPlayed, draw}: Props) => {

    const didWin = ():boolean => {
        if(seriesData.participants[0].roster.id === rosterID && seriesData.participants[0].winner === true) return true
        return false
    }

    const getResultColor = () => {
        if(!hasPlayed) return "white"
        if(didWin()) return "#6fbf73"
        if(draw) return "#ffac33"
        return "#f6685e"
    }


    return (
        <div className="seriesCard" style={{background: getResultColor()}}>
            <p><b>{seriesData.tournament.name}</b></p>
            <p>{seriesData.title} - Best of {seriesData.best_of}</p>
            {!hasPlayed && <p>{seriesData.start}</p>}
            {hasPlayed && <p>{seriesData.end}</p>}
            {(hasPlayed && !draw) && <p>{didWin() ? "Victory" : "Defeat"}</p> }
            {(hasPlayed && draw) && <p>Draw</p> }
        </div>
    )
}

export default SeriesCard