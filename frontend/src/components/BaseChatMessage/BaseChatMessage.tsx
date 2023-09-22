import React from 'react'
import type ChatMessage from '../../types/ChatMessage'
import './BaseChatMessage.css'
import ReactMarkdown from 'react-markdown'

interface Props {
  message: ChatMessage
}

const BaseChatMessage = ({ message }: Props): React.ReactNode => {
  return (
    <div className="base-chat-message">
      {message.sender}
      <ReactMarkdown linkTarget="_blank">{message.message}</ReactMarkdown>
    </div>
  )
}

export default BaseChatMessage
