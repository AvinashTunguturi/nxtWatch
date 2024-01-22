import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Header from '../Header'
import Sidebar from '../Sidebar'
import FailureComponent from '../FailureComponent'
import {SidebarViewContainer, LoaderContainer} from '../Home/styledComponents'

import ThemeContext from '../../context/ThemeContext'

import {
  VideoItemDetailsContainer,
  VideoItemDetailsRouteContainer,
  VideoItemDetailsRouteBody,
  VideoItemDetailsTitle,
  VideoItemDetailsViewsLikesContainer,
  VideoItemViewsContainer,
  VideoItemViews,
  VideoItemPublished,
  VideoItemsLikeSaveContainer,
  VideoIconsContainer,
  IconName,
  VideoItemChannelDetails,
  VideoItemChannelLogo,
  VideoItemChannelSubscriberContainer,
  ChannelName,
  SubscriberCount,
  VideoItemDescription,
  LikeButton,
  DislikeButton,
  SaveButton,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

/*
const savedStatusConstants = {
  initial: 'INITIAL',
  save: 'SAVE',
  remove: 'REMOVE',
  isLiked: false,
    isDisliked: false,
    isSaved: false,
}
*/

class VideoItemDetails extends Component {
  state = {
    currentVideo: {},
    apiStatus: apiStatusConstants.initial,
    // isLiked: false,
    // isDisliked: false,
    save: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const videoDetails = fetchedData.video_details

      const currentVideo = {
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        description: videoDetails.description,
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
        isSaved: false,
      }

      this.setState({
        currentVideo,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickLikeButton = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislikeButton = () => {
    this.setState(prevState => ({
      isLiked: false,
      isDisliked: !prevState.isDisliked,
    }))
  }

  onClickSaveButton = () => {
    this.setState(prevState => ({
      save: !prevState.save,
    }))
  }

  renderVideoItemDetailsView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {
          isLiked,
          isDisliked,
          addToSavedList,
          removeFromSaveList,
          toggleLike,
          toggleDislike,
          // toggleSave,
        } = value
        const {currentVideo, save} = this.state

        const {
          channel,
          description,
          publishedAt,
          id,
          title,
          videoUrl,
          viewCount,
          isSaved,
        } = currentVideo
        /*
        const onClickSaveButton = () => {
          addToSavedList({...currentVideo, isLiked, isDisliked, isSaved})
        }
        */

        const onClickLikeButton = () => {
          toggleLike()
        }

        const onClickDislikeButton = () => {
          toggleDislike()
        }

        /*
        const onClickSaveButton = () => {
          toggleSave()
        }

        */

        const timeDistance = formatDistanceToNow(new Date(publishedAt))

        const saveText = save ? 'Saved' : 'Save'

        if (save) {
          addToSavedList({...currentVideo, isLiked, isDisliked, isSaved: save})
        }

        // console.log("isSaved",isSaved)

        const onClickSavedButton = () => {
          removeFromSaveList(id)
        }

        const {name, profileImageUrl, subscriberCount} = channel
        return (
          <>
            <VideoItemDetailsContainer>
              <ReactPlayer url={videoUrl} />
              <VideoItemDetailsTitle>{title}</VideoItemDetailsTitle>
              <VideoItemDetailsViewsLikesContainer>
                <VideoItemViewsContainer>
                  <VideoItemViews>{`${viewCount} views`}</VideoItemViews>
                  <VideoItemPublished>{timeDistance} ago</VideoItemPublished>
                </VideoItemViewsContainer>
                <VideoItemsLikeSaveContainer>
                  <VideoIconsContainer>
                    <LikeButton
                      type="button"
                      onClick={onClickLikeButton}
                      isLiked={isLiked}
                    >
                      <BiLike />
                      <IconName>Like</IconName>
                    </LikeButton>
                  </VideoIconsContainer>
                  <VideoIconsContainer>
                    <DislikeButton
                      type="button"
                      onClick={onClickDislikeButton}
                      isDisliked={isDisliked}
                    >
                      <BiDislike />
                      <IconName>Dislike</IconName>
                    </DislikeButton>
                  </VideoIconsContainer>
                  <VideoIconsContainer>
                    {isSaved ? (
                      <SaveButton
                        type="button"
                        onClick={onClickSavedButton}
                        isSaved={save}
                      >
                        <BiListPlus />
                        <IconName>{saveText}</IconName>
                      </SaveButton>
                    ) : (
                      <SaveButton
                        type="button"
                        onClick={this.onClickSaveButton}
                        isSaved={save}
                      >
                        <BiListPlus />
                        <IconName>{saveText}</IconName>
                      </SaveButton>
                    )}
                  </VideoIconsContainer>
                </VideoItemsLikeSaveContainer>
              </VideoItemDetailsViewsLikesContainer>

              <VideoItemChannelDetails>
                <VideoItemChannelLogo
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <VideoItemChannelSubscriberContainer>
                  <ChannelName>{name}</ChannelName>
                  <SubscriberCount>{`${subscriberCount} subscribers`}</SubscriberCount>
                </VideoItemChannelSubscriberContainer>
              </VideoItemChannelDetails>
              <VideoItemDescription>{description}</VideoItemDescription>
            </VideoItemDetailsContainer>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  onClickRetry = () => this.getVideoItemDetails()

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

  renderAllVideoItemDetailsViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItemDetailsView()
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
            <VideoItemDetailsRouteContainer
              isDarkTheme={isDarkTheme}
              data-testid="videoItemDetails"
            >
              <Header />
              <VideoItemDetailsRouteBody>
                <SidebarViewContainer>
                  <Sidebar />
                </SidebarViewContainer>
                <VideoItemDetailsContainer>
                  {this.renderAllVideoItemDetailsViews()}
                </VideoItemDetailsContainer>
              </VideoItemDetailsRouteBody>
            </VideoItemDetailsRouteContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
