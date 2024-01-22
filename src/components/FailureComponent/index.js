import ThemeContext from '../../context/ThemeContext'
import {
  FailureViewContainer,
  FailureImg,
  FailureTitle,
  FailureDescription,
  FailureButtonContainer,
  FailureButton,
} from './styledComponents'

const FailureComponent = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {onClickRetry} = props

      const onClickRetryButton = () => {
        onClickRetry()
      }

      const failureImg = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

      return (
        <FailureViewContainer>
          <FailureImg src={failureImg} alt="failure view" />
          <FailureTitle>Oops! Something Went Wrong</FailureTitle>
          <FailureDescription>
            We are having some trouble to complete your request. Please try
            again.
          </FailureDescription>
          <FailureButtonContainer>
            <FailureButton
              type="button"
              className="retry-button"
              onClick={onClickRetryButton}
            >
              Retry
            </FailureButton>
          </FailureButtonContainer>
        </FailureViewContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default FailureComponent
