// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {isLoading: true, teamsList: {}}

  componentDidMount() {
    this.getTeamsListData()
  }

  getTeamsListData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const formattedData = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))
    console.log(formattedData)
    this.setState({isLoading: false, teamsList: formattedData})
  }

  render() {
    const {isLoading, teamsList} = this.state

    return (
      <div className="home-container">
        {isLoading ? (
          <div data-testid="loader" className="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            <div className="heading-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="ipl-logo"
              />
              <h1 className="heading">IPL Dashboard</h1>
            </div>
            <div className="unordered-list-container">
              <ul className="unordered-list">
                {teamsList.map(eachTeam => (
                  <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Home
