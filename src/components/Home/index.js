import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import {GrFormClose} from 'react-icons/gr'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Sidebar from '../Sidebar'
import HomeVideoItem from '../HomeVideoItem'
import FailureComponent from '../FailureComponent'
import ThemeContext from '../../context/ThemeContext'
import {
  HomeRouteContainer,
  HomeRouteBody,
  SidebarViewContainer,
  HomeBodyContainer,
  HomeBanner,
  WebsiteLogo,
  HomeBannerText,
  HomeBannerButton,
  SearchBarContainer,
  Search,
  SearchButton,
  VideoItemsContainer,
  LoaderContainer,
} from './styledComponents'

import {
  FailureViewContainer,
  FailureImg,
  FailureTitle,
  FailureDescription,
  FailureButtonContainer,
  FailureButton,
} from '../FailureComponent/styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    videosData: [],
    showBanner: true,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

      const videosData = videos.map(videoDetails => ({
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

      this.setState({
        videosData,
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

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearchButton = () => this.getHomeVideos()

  onClickRetry = () => this.getHomeVideos()

  onClickClose = () => {
    this.setState(prevState => ({
      showBanner: !prevState.showBanner,
    }))
  }

  renderSearchBar = () => {
    const {searchInput} = this.state

    return (
      <SearchBarContainer>
        <Search
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <SearchButton
          onClick={this.onClickSearchButton}
          data-testid="searchButton"
        >
          <BsSearch />
        </SearchButton>
      </SearchBarContainer>
    )
  }

  renderNoResultsView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        console.log(isDarkTheme)

        return (
          <FailureViewContainer>
            <FailureImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <FailureTitle>No Search Results Found</FailureTitle>
            <FailureDescription>
              Try different key words or remove search filter
            </FailureDescription>
            <FailureButtonContainer>
              <FailureButton
                type="button"
                className="retry-button"
                onClick={this.onClickRetry}
              >
                Retry
              </FailureButton>
            </FailureButtonContainer>
          </FailureViewContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderHomeVideosView = () => {
    const {videosData} = this.state

    return (
      <>
        {videosData.length === 0 ? (
          this.renderNoResultsView()
        ) : (
          <VideoItemsContainer>
            {videosData.map(videoDetails => (
              <HomeVideoItem
                key={videoDetails.id}
                videoDetails={videoDetails}
              />
            ))}
          </VideoItemsContainer>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <FailureComponent onClickRetry={this.onClickRetry} />
  )

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderContainer>
  )

  renderAllHomeViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeVideosView()
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
          const {showBanner} = this.state

          const webSiteLogoUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <HomeRouteContainer isDarkTheme={isDarkTheme} data-testid="home">
              <Header />
              <HomeRouteBody>
                <SidebarViewContainer>
                  <Sidebar />
                </SidebarViewContainer>
                <HomeBodyContainer>
                  <>
                    <HomeBanner data-testid="banner" showBanner={showBanner}>
                      <WebsiteLogo src={webSiteLogoUrl} alt="nxt watch logo" />
                      <HomeBannerText>
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </HomeBannerText>
                      <HomeBannerButton>GET IT NOW</HomeBannerButton>
                      <SearchButton
                        data-testid="close"
                        onClick={this.onClickClose}
                      >
                        <GrFormClose />
                      </SearchButton>
                    </HomeBanner>
                  </>
                  {this.renderSearchBar()}
                  {this.renderAllHomeViews()}
                </HomeBodyContainer>
              </HomeRouteBody>
            </HomeRouteContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
