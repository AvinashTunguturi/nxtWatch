import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import {
  GamingVideoListItem,
  GamingVideoItemImage,
  GamingVideoItemTitle,
  GamingVideosViews,
} from './styledComponents'

const GamingVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      console.log(isDarkTheme)

      const {videoDetails} = props
      const {id, thumbnailUrl, title, viewCount} = videoDetails

      return (
        <GamingVideoListItem>
          <Link to={`/videos/${id}`}>
            <GamingVideoItemImage src={thumbnailUrl} alt="video thumbnail" />
            <GamingVideoItemTitle>{title}</GamingVideoItemTitle>
            <GamingVideosViews>
              {viewCount} Watching Worldwide
            </GamingVideosViews>
          </Link>
        </GamingVideoListItem>
      )
    }}
  </ThemeContext.Consumer>
)

export default GamingVideoItem
