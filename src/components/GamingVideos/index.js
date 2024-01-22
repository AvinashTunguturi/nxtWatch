import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingVideoItem from '../GamingVideoItem'
import FailureComponent from '../FailureComponent'
import {SidebarViewContainer, LoaderContainer} from '../Home/styledComponents'

import ThemeContext from '../../context/ThemeContext'
import {
  GamingVideosRouteContainer,
  GamingVideosRouteBody,
  GamingVideosBodyContainer,
  GamingVideosBanner,
  GamingVideosBannerTitle,
  GamingVideoItemsContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GamingVideos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideos: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = ` https://apis.ccbp.in/videos/gaming`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedVideosData = await response.json()

      const gamingVideos = fetchedVideosData.videos.map(videoDetails => ({
        id: videoDetails.id,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        viewCount: videoDetails.view_count,
        isSaved: false,
      }))

      this.setState({
        gamingVideos,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderGamingVideosViews = () => {
    const {gamingVideos} = this.state

    return (
      <>
        <GamingVideosBanner data-testid="banner">
          <SiYoutubegaming />
          <GamingVideosBannerTitle>Gaming</GamingVideosBannerTitle>
        </GamingVideosBanner>

        <GamingVideoItemsContainer>
          {gamingVideos.map(videoDetails => (
            <GamingVideoItem
              key={videoDetails.id}
              videoDetails={videoDetails}
            />
          ))}
        </GamingVideoItemsContainer>
      </>
    )
  }

  onClickRetry = () => this.getGamingVideos()

  renderFailureView = () => (
    <FailureComponent onClickRetry={this.onClickRetry} />
  )

  /*

  renderFailureView = () => (
    <div className="jobs-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-view__heading">Oops! Something Went Wrong</h1>
      <p className="failure-view__description">
        We cannot seem to find the page you are looking for
      </p>
      <div className="retry-button-container">
        <button
          type="button"
          className="retry-button"
          onClick={this.retryJobItemDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )
*/
  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderContainer>
  )

  renderAllGamingVideosViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideosViews()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <GamingVideosRouteContainer
              isDarkTheme={isDarkTheme}
              data-testid="gaming"
            >
              <Header />
              <GamingVideosRouteBody isDarkTheme={isDarkTheme}>
                <SidebarViewContainer>
                  <Sidebar />
                </SidebarViewContainer>
                <GamingVideosBodyContainer>
                  {this.renderAllGamingVideosViews()}
                </GamingVideosBodyContainer>
              </GamingVideosRouteBody>
            </GamingVideosRouteContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default GamingVideos
