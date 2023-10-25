import React from 'react'
import ChatMessage from '../ChatMessage/ChatMessage'
import IncomingChatMessage from '../IncomingChatMessage/IncomingChatMessage'
import './ChatMessagesList.css'
import ChatIntroduction from '../ChatIntroduction/ChatIntroduction'
import InitialSuggestedMessagesRow from '../InitialSuggestedMessagesRow/InitialSuggestedMessagesRow'
import type BaseResponse from '../../types/BaseResponse'
import type ChatMessageType from '../../types/ChatMessageType'
import type ContactPreFilled from '../../types/ContactPreFilled'
import ContactMessage from '../ContactMessage/ContactMessage'

interface Props {
  staticMessages: BaseResponse[]
  incomingMessage: string | undefined
  setSendMessageInputValue: (value: string) => void
  onSendMessage: () => void
}

const ChatMessagesList = ({
  staticMessages,
  incomingMessage,
  setSendMessageInputValue,
  onSendMessage
}: Props): React.ReactNode => {
  return (
    <div className="chat-message-list">
      <ChatIntroduction/>

      <InitialSuggestedMessagesRow
        messageHistoryLength={staticMessages.length}
        setSendMessageInputValue={setSendMessageInputValue}
        onSendMessage={onSendMessage}
      />

      {staticMessages.map((message, index) => {
        if (message.message_type === 'chat_response') {
          const castedMessage = message as ChatMessageType
          return (
            <ChatMessage message={castedMessage} key={index}/>
          )
        }

        if (message.message_type === 'contact_pre_filled') {
          const castedMessage = message as ContactPreFilled
          return (
            <ContactMessage contactDetails={castedMessage} key={index}/>
          )
        }

        return null
      })}
      <IncomingChatMessage message={incomingMessage}/>
    </div>
  )
}

export default ChatMessagesList
