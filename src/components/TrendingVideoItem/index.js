import {Link} from 'react-router-dom'
import {formatDistanceToNowStrict} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'

import {
  VideoListItem,
  VideoItemImage,
  VideoItemDetailsContainer,
  ChannelThumbnail,
  VideoItemTextsContainer,
  VideoTitle,
  ChannelDetailsContainer,
  ChannelName,
  ChannelViewsDatesContainer,
  ChannelViews,
  VideoPublished,
} from './styledComponents'

const TrendingVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      console.log(isDarkTheme)

      const {videoDetails} = props
      const {
        channel,
        id,
        publishedAt,
        thumbnailUrl,
        title,
        viewCount,
      } = videoDetails
      const {name, profileImageUrl} = channel

      const timeDistance = formatDistanceToNowStrict(new Date(publishedAt))

      return (
        <VideoListItem>
          <Link to={`/videos/${id}`}>
            <VideoItemImage src={thumbnailUrl} alt="video thumbnail" />
            <VideoItemDetailsContainer>
              <ChannelThumbnail src={profileImageUrl} alt="" />
              <VideoItemTextsContainer>
                <VideoTitle>{title}</VideoTitle>
                <ChannelDetailsContainer>
                  <ChannelName>{name}</ChannelName>
                  <ChannelViewsDatesContainer>
                    <ChannelViews>{viewCount} views</ChannelViews>
                    <VideoPublished>{timeDistance} ago</VideoPublished>
                  </ChannelViewsDatesContainer>
                </ChannelDetailsContainer>
              </VideoItemTextsContainer>
            </VideoItemDetailsContainer>
          </Link>
        </VideoListItem>
      )
    }}
  </ThemeContext.Consumer>
)

export default TrendingVideoItem
