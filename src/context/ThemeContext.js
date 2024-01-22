import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  isLiked: false,
  isDisliked: false,
  isSaved: false,
  toggleTheme: () => {},
  addToSavedList: () => {},
  removeFromSaveList: () => {},
  toggleLike: () => {},
  toggleDislike: () => {},
  toggleSave: () => {},
})

export default ThemeContext
