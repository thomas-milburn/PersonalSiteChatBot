import React from 'react'
import type ChatMessage from '../../types/ChatMessage'
import './BaseChatMessage.css'

interface Props {
  message: ChatMessage
}

const BaseChatMessage = ({ message }: Props): React.ReactNode => {
  return (
    <div className="base-chat-message">
      {message.sender}: {message.message}
    </div>
  )
}

export default BaseChatMessage
