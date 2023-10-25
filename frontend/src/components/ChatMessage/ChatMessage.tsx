import React from 'react'
import type ChatMessageType from '../../types/ChatMessageType'
import './ChatMessage.css'
import ReactMarkdown from 'react-markdown'
import BaseChat from '../BaseChat/BaseChat'

interface Props {
  message: ChatMessageType
}

const ChatMessage = ({ message }: Props): React.ReactNode => {
  return (
    <BaseChat>
      <span className="chat-message__sender">
        {message.sender === 'human' ? 'You' : 'Assistant'}
      </span>
      <ReactMarkdown className="chat-message__markup" linkTarget="_blank">{message.message}</ReactMarkdown>
    </BaseChat>
  )
}

export default ChatMessage
