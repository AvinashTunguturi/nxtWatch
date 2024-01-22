import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'

import {BsFillBrightnessHighFill} from 'react-icons/bs'
import {FiMoon} from 'react-icons/fi'

import ThemeContext from '../../context/ThemeContext'

import {
  HeaderContainer,
  HeaderLogoContainer,
  HeaderLogoImage,
  HeaderIconContainer,
  ThemeButton,
  ProfileImage,
  LogoutButton,
  PopupEnquiry,
  PopupContainer,
  PopupButton,
} from './styledComponents'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const changeTheme = () => {
        toggleTheme()
      }

      const websiteLogo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const renderLogout = () => (
        <Popup
          modal
          trigger={<LogoutButton type="button">Logout</LogoutButton>}
        >
          {close => (
            <PopupContainer>
              <PopupEnquiry>Are you sure, you want to logout</PopupEnquiry>
              <PopupButton
                type="button"
                className="trigger-button"
                data-testid="closeButton"
                onClick={() => close()}
              >
                Cancel
              </PopupButton>

              <PopupButton onClick={onClickLogout}>Confirm</PopupButton>
            </PopupContainer>
          )}
        </Popup>
      )

      return (
        <HeaderContainer>
          <Link to="/">
            <HeaderLogoContainer>
              <HeaderLogoImage src={websiteLogo} alt="website logo" />
            </HeaderLogoContainer>
          </Link>
          <HeaderIconContainer>
            <ThemeButton onClick={changeTheme} data-testid="theme">
              {isDarkTheme ? <BsFillBrightnessHighFill /> : <FiMoon />}
            </ThemeButton>
            <ProfileImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            {renderLogout()}

            {/* <LogoutButton onClick={onClickLogout} isDarkTheme={isDarkTheme}>
              Logout
            </LogoutButton> */}
          </HeaderIconContainer>
        </HeaderContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
