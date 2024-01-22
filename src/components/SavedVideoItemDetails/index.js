import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

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
} from '../VideoItemDetails/styledComponents'

class SavedVideoItemDetails extends Component {
  renderSavedVideoItemDetailsViews = () => (
    <ThemeContext.Consumer>
      {value => {
        const {
          removeFromSaveList,
          toggleLike,
          toggleDislike,
          // toggleSave,
        } = value
        const {videoDetails} = this.props
        const {
          channel,
          description,
          publishedAt,
          id,
          title,
          videoUrl,
          viewCount,
          isLiked,
          isDisliked,
          isSaved,
        } = videoDetails
        /*
        const onClickSaveButton = () => {
          addToSavedList({...currentVideo, isLiked, isDisliked, isSaved})
        }
        */

        console.log('SavedVideoItemDetails')

        const onClickLikeButton = () => {
          toggleLike()
        }

        const onClickDislikeButton = () => {
          toggleDislike()
        }

        const timeDistance = formatDistanceToNow(new Date(publishedAt))

        /* if (isSaved === true && saveText === 'Save') {
          removeFromSaveList(id)
        } */

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
                    <SaveButton
                      type="button"
                      onClick={onClickSavedButton}
                      isSaved={isSaved}
                    >
                      <BiListPlus />
                      <IconName>Saved</IconName>
                    </SaveButton>
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
              <VideoItemDetailsRouteBody>
                <VideoItemDetailsContainer>
                  {this.renderSavedVideoItemDetailsViews()}
                </VideoItemDetailsContainer>
              </VideoItemDetailsRouteBody>
            </VideoItemDetailsRouteContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideoItemDetails
