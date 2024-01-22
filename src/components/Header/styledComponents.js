import styled from 'styled-components'

export const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`
export const HeaderLogoContainer = styled.div`
  width: 120px;
`
export const HeaderLogoImage = styled.img`
  width: 100px;
`

export const HeaderIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
`

export const ThemeButton = styled.button``

export const ProfileImage = styled.img`
  width: 25px;
  height: 25px;
`
export const LogoutButton = styled.button`
  border-color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  padding: 6px 12px;
  background-color: transparent;
`

export const PopupEnquiry = styled.p``

export const PopupContainer = styled.div``

export const PopupButton = styled.button``
