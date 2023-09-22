import React from 'react'
import type ChatMessage from '../../types/ChatMessage'

interface Props {
  message: ChatMessage
}

const BaseChatMessage = ({ message }: Props): React.ReactNode => {
  return (
    <div>
      {message.sender}: {message.message}
    </div>
  )
}

export default BaseChatMessage
