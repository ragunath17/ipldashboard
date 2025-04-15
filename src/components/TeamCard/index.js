// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails
  return (
    <li className="list-container">
      <Link to={`/team-matches/${id}`} className="anchor-item">
        <img src={teamImageUrl} alt={`${name}`} className="team-logo" />
        <p className="ipl-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
