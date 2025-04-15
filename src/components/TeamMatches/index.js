// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatches from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const backgroundColorClassNames = [
  'CSK',
  'RCB',
  'KKR',
  'KXP',
  'RR',
  'MI',
  'SH',
  'DC',
]

class TeamMatches extends Component {
  state = {
    recentMatchesDataList: [],
    teamBanner: '',
    latestMatchDetailsList: [],
    isLoading: true,
    backgroundClassName: '',
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const recentMatchesData = data.recent_matches.map(eachMatch => ({
      umpires: eachMatch.umpires,
      result: eachMatch.result,
      manOfTheMatch: eachMatch.man_of_the_match,
      id: eachMatch.id,
      date: eachMatch.date,
      venue: eachMatch.venue,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      firstInnings: eachMatch.first_innings,
      secondInnings: eachMatch.second_innings,
      matchStatus: eachMatch.match_status,
    }))

    const getBackgroundClassName = backgroundColorClassNames.map(
      eachClassName => {
        if (eachClassName === id) {
          this.setState({backgroundClassName: eachClassName})
        }
        return eachClassName
      },
    )
    console.log(getBackgroundClassName)

    const latestMatchData = data.latest_match_details

    this.setState({
      recentMatchesDataList: recentMatchesData,
      teamBanner: data.team_banner_url,
      latestMatchDetailsList: latestMatchData,
      isLoading: false,
    })
  }
  /*
  convertCamelCase = () => {
    const {latestMatchDetailsList} = this.state
    const camelCaseConverted = latestMatchDetailsList.map(eachDetails => ({
      umpires: eachDetails.umpires,
      result: eachDetails.result,
      manOfTheMatch: eachDetails.man_of_the_match,
      id: eachDetails.id,
      date: eachDetails.date,
      venue: eachDetails.venue,
      competingTeam: eachDetails.competing_team,
      competingTeamLogo: eachDetails.competing_team_logo,
      firstInnings: eachDetails.first_innings,
      secondInnings: eachDetails.second_innings,
      matchStatus: eachDetails.match_status,
    }))
    this.setState({latestMatchDetailsList: camelCaseConverted})
    console.log(latestMatchDetailsList)
    return {camelCaseConverted}
  }
*/

  renderTeamData = () => {
    const {
      recentMatchesDataList,
      teamBanner,
      latestMatchDetailsList,
      backgroundClassName,
    } = this.state

    return (
      <div className={`team-matches-container ${backgroundClassName}`}>
        <img src={teamBanner} alt="team banner" className="team-banner-img" />
        <div>
          <h1 className="latest-match-heading">Latest Matches</h1>
          <div className="latest-matches-container">
            <LatestMatches
              key={latestMatchDetailsList.id}
              latestMatchDetails={latestMatchDetailsList}
            />
          </div>
        </div>
        <ul className="match-card-unordered-container">
          {recentMatchesDataList.map(eachItem => (
            <MatchCard key={eachItem.id} recentMatches={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader" className="team-data-loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamData()
        )}
      </div>
    )
  }
}

export default TeamMatches
