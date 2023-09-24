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
      <span className="base-chat-message__sender">
        {message.sender === 'human' ? 'You' : 'Assistant'}
      </span>
      <ReactMarkdown className="base-chat-message__markup" linkTarget="_blank">{message.message}</ReactMarkdown>
    </div>
  )
}

export default BaseChatMessage
