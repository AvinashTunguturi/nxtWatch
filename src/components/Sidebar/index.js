import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import {
  SidebarContainer,
  RouteLinksContainer,
  RouteLink,
  RouteName,
  Footer,
  FooterHeading,
  SocialMediaIconsContainer,
  SocialMediaIcon,
  FooterDescription,
} from './styledComponents'

const Sidebar = () => (
  <SidebarContainer>
    <RouteLinksContainer>
      <Link to="/">
        <RouteLink>
          <AiFillHome />
          <RouteName>Home</RouteName>
        </RouteLink>
      </Link>
      <Link to="/trending">
        <RouteLink>
          <HiFire />
          <RouteName>Trending</RouteName>
        </RouteLink>
      </Link>
      <Link to="/gaming">
        <RouteLink>
          <SiYoutubegaming />
          <RouteName>Gaming</RouteName>
        </RouteLink>
      </Link>
      <Link to="/saved-videos">
        <RouteLink>
          <BiListPlus />
          <RouteName>Saved Videos</RouteName>
        </RouteLink>
      </Link>
    </RouteLinksContainer>
    <Footer>
      <FooterHeading>CONTACT US</FooterHeading>
      <SocialMediaIconsContainer>
        <SocialMediaIcon
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
        <SocialMediaIcon
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
        <SocialMediaIcon
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </SocialMediaIconsContainer>
      <FooterDescription>
        Enjoy! Now to see your channels and recommendations!
      </FooterDescription>
    </Footer>
  </SidebarContainer>
)

export default Sidebar
