import React from 'react'
import BaseChatMessage from '../BaseChatMessage/BaseChatMessage'
import IncomingChatMessage from '../IncomingChatMessage/IncomingChatMessage'
import type ChatMessage from '../../types/ChatMessage'
import './ChatMessagesList.css'

interface Props {
  staticMessages: ChatMessage[]
  incomingMessage: string | undefined
}

const ChatMessagesList = ({
  staticMessages,
  incomingMessage
}: Props): React.ReactNode => {
  return (
    <div className="chat-message-list">
      <div>
        This site is protected by reCAPTCHA and the Google <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >Privacy Policy</a> and <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noreferrer"
        >Terms of Service</a> apply.
      </div>

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
