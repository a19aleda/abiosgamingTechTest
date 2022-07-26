import { Player } from "../../interfaces"

interface Props {
    playerData: Player
}

const PlayerCard = ({playerData}: Props) => {
    return (
        <div className="playerCard">
            {playerData.images.length > 0 && <img src={playerData.images[0].url} /> }
            {playerData.images.length === 0 && <img src="https://media.istockphoto.com/vectors/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-vector-id1087531642?k=20&m=1087531642&s=170667a&w=0&h=ge3fq1Dw0-J2FoW96c8klSiHyOnitVhReUUuIIYqtvw=" /> }
            <h3>{playerData.nick_name}</h3>
            <p>{`${playerData.first_name} ${playerData.last_name}`}</p>
        </div>
    )
}

export default PlayerCard