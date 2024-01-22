import styled from 'styled-components'

export const SavedVideosRouterContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f ' : '#f9f9f9')};
`

export const SavedVideosBody = styled.div`
  display: flex;
`

export const NoSavedVideosContainer = styled.div``

export const NoSavedImg = styled.img``

export const NoSavedTitle = styled.h1``

export const NoSavedDescription = styled.p``

export const SavedVideosBanner = styled.div``

export const SavedVideosBannerTitle = styled.h1``
