import styled from 'styled-components'

export const VideoItemDetailsRouteContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f ' : '#f9f9f9')};
`
export const VideoItemDetailsRouteBody = styled.div`
  display: flex;
`

export const VideoItemDetailsContainer = styled.div`
  width: 70%;
`

export const VideoItemDetailsTitle = styled.p``

export const VideoItemDetailsViewsLikesContainer = styled.div``

export const VideoItemViewsContainer = styled.div``

export const VideoItemViews = styled.p``

export const VideoItemPublished = styled.p``

export const VideoItemsLikeSaveContainer = styled.div``

export const VideoIconsContainer = styled.div``

export const Button = styled.button``

export const LikeButton = styled(Button)`
  color: ${props => (props.isLiked ? '#2563eb' : '#64748b')};
`

export const DislikeButton = styled(Button)`
  color: ${props => (props.isDisliked ? '#2563eb' : '#64748b')};
`
export const SaveButton = styled(Button)`
  color: ${props => (props.isSaved ? '#2563eb' : '#64748b')};
`
export const IconName = styled.p``

export const VideoItemChannelDetails = styled.div``

export const VideoItemChannelLogo = styled.img``

export const VideoItemChannelSubscriberContainer = styled.div``

export const ChannelName = styled.p``

export const SubscriberCount = styled.p``

export const VideoItemDescription = styled.p``

// export const  = styled.``
