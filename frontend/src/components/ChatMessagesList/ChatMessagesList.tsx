import React from 'react'
import BaseChatMessage from '../BaseChatMessage/BaseChatMessage'
import IncomingChatMessage from '../IncomingChatMessage/IncomingChatMessage'
import type ChatMessage from '../../types/ChatMessage'
import './ChatMessagesList.css'

interface Props {
  staticMessages: ChatMessage[]
  incomingMessage: string | undefined
}
const ChatMessagesList = ({ staticMessages, incomingMessage }: Props): React.ReactNode => {
  return (
    <div className="chat-message-list">
      {staticMessages.map((message, index) => {
        return (
          <BaseChatMessage message={message} key={index}/>
        )
      })}
      <IncomingChatMessage message={incomingMessage}/>
    </div>
  )
}

export default ChatMessagesList
