import Header from '../Header'
import Sidebar from '../Sidebar'

import ThemeContext from '../../context/ThemeContext'

import {
  NotFoundContainer,
  NotFoundImage,
  Heading,
  Paragraph,
} from './styledComponents'
import {SidebarViewContainer} from '../Home/styledComponents'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const notFoundImg = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <>
          <Header />

          <SidebarViewContainer>
            <Sidebar />
          </SidebarViewContainer>
          <NotFoundContainer>
            <NotFoundImage src={notFoundImg} alt="not found" />
            <Heading>Page Not Found</Heading>
            <Paragraph>
              we are sorry, the page you requested could not be found.
            </Paragraph>
          </NotFoundContainer>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
