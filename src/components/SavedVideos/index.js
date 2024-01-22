import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedVideoItemDetails from '../SavedVideoItemDetails'
import {SidebarViewContainer} from '../Home/styledComponents'
import {TrendingVideoItemsContainer} from '../TrendingVideos/styledComponents'

import ThemeContext from '../../context/ThemeContext'

import {
  SavedVideosRouterContainer,
  SavedVideosBody,
  NoSavedVideosContainer,
  NoSavedImg,
  NoSavedTitle,
  NoSavedDescription,
  SavedVideosBanner,
  SavedVideosBannerTitle,
} from './styledComponents'

const renderNoSavedVideosViews = () => (
  <NoSavedVideosContainer>
    <NoSavedImg
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
      alt="no saved videos"
    />
    <NoSavedTitle>No Saved Videos Found</NoSavedTitle>
    <NoSavedDescription>
      Save your videos by clicking a button
    </NoSavedDescription>
  </NoSavedVideosContainer>
)

const renderSavedVideosViews = savedVideos => {
  console.log(savedVideos)
  return (
    <>
      <SavedVideosBanner data-testid="banner">
        <HiFire />
        <SavedVideosBannerTitle>Saved Videos</SavedVideosBannerTitle>
      </SavedVideosBanner>
      <TrendingVideoItemsContainer>
        {savedVideos.map(videoDetails => (
          <SavedVideoItemDetails
            key={videoDetails.id}
            videoDetails={videoDetails}
          />
        ))}
      </TrendingVideoItemsContainer>
    </>
  )
}

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {savedVideos} = value

      return (
        <SavedVideosRouterContainer
          isDarkTheme={isDarkTheme}
          data-testid="savedVideos"
        >
          <Header />
          <SavedVideosBody>
            <SidebarViewContainer>
              <Sidebar />
            </SidebarViewContainer>
            {savedVideos.length === 0
              ? renderNoSavedVideosViews()
              : renderSavedVideosViews(savedVideos)}
          </SavedVideosBody>
        </SavedVideosRouterContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
