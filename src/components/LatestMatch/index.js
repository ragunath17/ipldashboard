// Write your code here
import './index.css'

const LatestMatches = props => {
  const {latestMatchDetails} = props
  const {umpires, result, date, venue} = latestMatchDetails

  const manOfTheMatch = latestMatchDetails.man_of_the_match
  const competingTeam = latestMatchDetails.competing_team
  const competingTeamLogo = latestMatchDetails.competing_team_logo
  const firstInnings = latestMatchDetails.first_innings
  const secondInnings = latestMatchDetails.second_innings

  return (
    <div className="latest-match-details-container">
      <div className="team-info">
        <p className="team-info-competing-team">{competingTeam}</p>
        <p className="team-info-date">{date}</p>
        <p className="team-info-venue">{venue}</p>
        <p className="team-info-result">{result}</p>
      </div>
      <div className="competing-team-logo-card">
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="competing-team-img"
        />
      </div>
      <div className="team-details-card">
        <p className="team-details">First Innings</p>
        <p className="team-details-info">{firstInnings}</p>
        <p className="team-details">Second Innings</p>
        <p className="team-details-info">{secondInnings}</p>
        <p className="team-details">Man Of The Match</p>
        <p className="team-details-info">{manOfTheMatch}</p>
        <p className="team-details">Umpires</p>
        <p className="team-details-info">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatches
