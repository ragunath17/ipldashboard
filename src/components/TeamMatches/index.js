// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {PieChart, Pie, Legend} from 'recharts'
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
    statistics: {won: 0, loss: 0, drawn: 0},
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
    const status = recentMatchesData.map(each => each.matchStatus)

    console.log(status)
    this.updateMatchStats(status)

    this.setState({
      recentMatchesDataList: recentMatchesData,
      teamBanner: data.team_banner_url,
      latestMatchDetailsList: latestMatchData,
      isLoading: false,
    })
  }

  updateMatchStats(result) {
    const {statistics} = this.state
    result.forEach(status => {
      if (status === 'Won') statistics.won += 1
      else if (status === 'Lost') statistics.loss += 1
      else statistics.drawn += 1
    })

    this.setState({statistics})
  }

  renderTeamData = () => {
    const {
      recentMatchesDataList,
      teamBanner,
      latestMatchDetailsList,
      backgroundClassName,
      statistics,
    } = this.state
    console.log(statistics)
    const data = [
      {
        name: 'Won',
        value: statistics.won,
      },
      {
        name: 'Lost',
        value: statistics.loss,
      },
      {
        name: 'Drawn',
        value: statistics.drawn,
      },
    ]

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

        <PieChart
          className="piechart-responsive-container"
          height={500}
          width={500}
        >
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label
          />
          <Legend />
        </PieChart>

        <Link to="/">
          <button type="button" className="back-btn">
            Back
          </button>
        </Link>
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
