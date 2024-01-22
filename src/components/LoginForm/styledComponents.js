import styled from 'styled-components'

export const LoginRouteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => (props.isDarkTheme ? '#000000 ' : '#ffffff')};
  margin: auto;
`

export const LoginFormContainer = styled.form`
  background-color: #2c364c;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  @media screen and (min-width: 992px) {
    width: 350px;
  }
`

export const LoginFormLogoContainer = styled.div`
  text-align: center;
`

export const LoginFormLogo = styled.img`
  width: 40%;
  margin: auto;
  padding: 16px;
  @media screen and (min-width: 992px) {
    width: 60%;
  }
`
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  background-color: transparent;
`
export const Label = styled.label`
  color: #f8fafc;
  font-size: 16px;
  font-weight: bold;
`

export const Input = styled.input`
  font-size: 16px;
  height: 40px;
  border: 1px solid #d7dfe9;
  color: #f1f5f9;
  border-radius: 2px;
  margin-top: 5px;
  padding: 8px 16px 8px 16px;
  outline: none;
  background-color: transparent;
`

export const CheckBoxContainer = styled.div``

export const CheckBox = styled.input``

export const CheckBoxLabel = styled.label``

export const LoginButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  border-radius: 12px;
  width: 100%;
  padding: 16px 0;
  border-style: none;
  font-size: 18px;
  font-weight: 700;
`
export const ErrorMessage = styled.p`
  align-self: start;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 0px;
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 16px;
  color: #ff0b37;
`
