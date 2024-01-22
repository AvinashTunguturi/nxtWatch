import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'
import {
  LoginRouteContainer,
  LoginFormContainer,
  LoginFormLogoContainer,
  LoginFormLogo,
  InputContainer,
  Label,
  Input,
  CheckBoxContainer,
  CheckBox,
  CheckBoxLabel,
  LoginButton,
  ErrorMessage,
} from './styledComponents'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: '',
    errorMsg: '',
    showPassword: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  checkedStatus = event => {
    this.setState({
      showPassword: event.target.checked,
    })
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <Label htmlFor="username">USERNAME</Label>
        <Input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'

    return (
      <>
        <Label htmlFor="password">PASSWORD</Label>
        <Input
          type={passwordType}
          placeholder="Username"
          id="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const {showSubmitError, errorMsg} = this.state

          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }

          const webSiteLogoUrl = !isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <LoginRouteContainer isDarkTheme={isDarkTheme}>
              <LoginFormContainer onSubmit={this.submitForm}>
                <LoginFormLogoContainer>
                  <LoginFormLogo src={webSiteLogoUrl} alt="website logo" />
                </LoginFormLogoContainer>
                <InputContainer>{this.renderUsernameField()}</InputContainer>
                <InputContainer>{this.renderPasswordField()}</InputContainer>
                <CheckBoxContainer>
                  <CheckBox
                    type="checkbox"
                    id="checkbox"
                    onChange={this.checkedStatus}
                  />
                  <CheckBoxLabel htmlFor="checkbox">
                    Show Password
                  </CheckBoxLabel>
                </CheckBoxContainer>
                <LoginButton type="submit">Login</LoginButton>
                {showSubmitError && <ErrorMessage>*{errorMsg}</ErrorMessage>}
              </LoginFormContainer>
            </LoginRouteContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginForm
