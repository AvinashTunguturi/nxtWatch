import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import Sidebar from '../Sidebar'
import TrendingVideoItem from '../TrendingVideoItem'
import FailureComponent from '../FailureComponent'

import ThemeContext from '../../context/ThemeContext'

import {SidebarViewContainer, LoaderContainer} from '../Home/styledComponents'
import {
  TrendingRouteContainer,
  TrendingRouteBody,
  TrendingVideosBodyContainer,
  TrendingBanner,
  TrendingBannerTitle,
  TrendingVideoItemsContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class TrendingVideos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideosData: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/videos/trending`
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

      const {videos} = fetchedVideosData

      const trendingVideosData = videos.map(videoDetails => ({
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
        },
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        viewCount: videoDetails.view_count,
        isSaved: false,
      }))

      // const {trendingVideosData} = fetchedVideosData

      this.setState({
        trendingVideosData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  /*
  renderBanner = () => {
    const {isDarkTheme} = value

    const webSiteLogoUrl = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

    return (
      <>
        <HomeBanner>
          <WebsiteLogo src={webSiteLogoUrl} alt="" />
          <HomeBannerText>
            Buy Nxt Watch Premium prepaid plans with UPI
          </HomeBannerText>
          <HomeBannerButton>GET IT NOW</HomeBannerButton>
        </HomeBanner>
        <GrFormClose />
      </>
    )
  }
*/

  renderTrendingVideosViews = () => {
    const {trendingVideosData} = this.state

    return (
      <>
        <TrendingBanner data-testid="banner">
          <HiFire />
          <TrendingBannerTitle>Trending</TrendingBannerTitle>
        </TrendingBanner>

        <TrendingVideoItemsContainer>
          {trendingVideosData.map(videoDetails => (
            <TrendingVideoItem
              key={videoDetails.id}
              videoDetails={videoDetails}
            />
          ))}
        </TrendingVideoItemsContainer>
      </>
    )
  }

  onClickRetry = () => this.getTrendingVideos()

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

  renderAllTrendingVideosViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideosViews()
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
            <TrendingRouteContainer
              isDarkTheme={isDarkTheme}
              data-testid="trending"
            >
              <Header />
              <TrendingRouteBody>
                <SidebarViewContainer>
                  <Sidebar />
                </SidebarViewContainer>
                <TrendingVideosBodyContainer>
                  {this.renderAllTrendingVideosViews()}
                </TrendingVideosBodyContainer>
              </TrendingRouteBody>
            </TrendingRouteContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default TrendingVideos
