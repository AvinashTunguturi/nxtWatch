import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'
/* "start": "craco start", */
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import TrendingVideos from './components/TrendingVideos'
import GamingVideos from './components/GamingVideos'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ThemeContext from './context/ThemeContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    savedVideos: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  toggleLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  toggleDislike = () => {
    this.setState(prevState => ({
      isLiked: false,
      isDisliked: !prevState.isDisliked,
    }))
  }

  toggleSave = () => {
    this.setState(prevState => ({
      isSaved: !prevState.isSaved,
    }))
  }

  addToSavedList = video => {
    const {savedVideos} = this.state
    const isPresent = savedVideos.find(
      videoDetails => videoDetails.id === video.id,
    )

    if (isPresent === undefined) {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, video],
      }))
    }
  }

  removeFromSaveList = id => {
    const {savedVideos} = this.state
    const updatedSavedList = savedVideos.filter(
      videoDetails => videoDetails.id !== id,
    )
    this.setState({savedVideos: updatedSavedList})
  }

  render() {
    const {isDarkTheme, savedVideos, isLiked, isDisliked, isSaved} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          savedVideos,
          isLiked,
          isDisliked,
          isSaved,
          addToSavedList: this.addToSavedList,
          removeFromSaveList: this.removeFromSaveList,
          toggleTheme: this.toggleTheme,
          toggleLike: this.toggleLike,
          toggleDislike: this.toggleDislike,
          toggleSave: this.toggleSave,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideos} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
