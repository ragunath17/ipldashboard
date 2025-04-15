// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatches} = props
  const {result, competingTeam, competingTeamLogo, matchStatus} = recentMatches

  const textColor = matchStatus === 'Lost' ? 'lost' : 'won'

  return (
    <li className="match-card-list-item">
      <div className="list-items-card">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="competing-team-logo"
        />
        <p className="first-innings">{competingTeam}</p>
        <p className="result">{result}</p>
        <p className={`match-status ${textColor}`}>{matchStatus}</p>
      </div>
    </li>
  )
}

export default MatchCard
