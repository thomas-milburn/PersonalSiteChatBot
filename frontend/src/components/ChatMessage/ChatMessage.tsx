import React, { useContext, useMemo } from 'react'
import type ChatMessageType from '../../types/ChatMessageType'
import './ChatMessage.css'
import ReactMarkdown from 'react-markdown'
import BaseChat from '../BaseChat/BaseChat'
import { ChatSessionContext, type ChatSessionContextType } from '../ChatSessionContextProvider/ChatSessionContextProvider'

interface Props {
  message: ChatMessageType
}

const ChatMessage = ({ message }: Props): React.ReactNode => {
  const { showToolMessages } = useContext<ChatSessionContextType>(ChatSessionContext)
  const isMessageVisible = useMemo<boolean>(() => {
    if (message.type !== 'tool') return true

    return showToolMessages
  }, [showToolMessages, message])

  return isMessageVisible
    ? (
      <BaseChat>
          <span className="chat-message__sender">
            {message.sender === 'human' ? 'You' : 'Assistant'}
          </span>
        <ReactMarkdown className="chat-message__markup" linkTarget="_blank">{message.message}</ReactMarkdown>
      </BaseChat>
      )
    : null
}

export default ChatMessage
