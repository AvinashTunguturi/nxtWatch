import styled from 'styled-components'

export const HomeRouteContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818 ' : '#f9f9f9')};
`
export const HomeRouteBody = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  margin: auto;
`

export const SidebarViewContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 30%;
  }
`

export const HomeBodyContainer = styled.div`
  @media screen and (min-width: 768px) {
    width: 70%;
    display: flex;
    flex-direction: column;
  }
`
export const HomeBanner = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  display: ${props => (props.showBanner ? 'block' : 'none')};
`
export const WebsiteLogo = styled.img`
  width: 120px;
  padding: 16px;
`
export const HomeBannerText = styled.p`
  display: ${props => (props.showBanner ? 'block' : 'none')};
`

export const HomeBannerButton = styled.button``

export const SearchBarContainer = styled.div``

export const Search = styled.input``

export const SearchButton = styled.button``

export const VideoItemsContainer = styled.ul``

export const LoaderContainer = styled.div``
