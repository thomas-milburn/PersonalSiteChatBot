import React from 'react'
import BaseChatMessage from '../BaseChatMessage/BaseChatMessage'
import IncomingChatMessage from '../IncomingChatMessage/IncomingChatMessage'
import type ChatMessage from '../../types/ChatMessage'
import './ChatMessagesList.css'
import ChatIntroduction from '../ChatIntroduction/ChatIntroduction'
import InitialSuggestedMessagesRow from '../InitialSuggestedMessagesRow/InitialSuggestedMessagesRow'

interface Props {
  staticMessages: ChatMessage[]
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
        return (
          <BaseChatMessage message={message} key={index}/>
        )
      })}
      <IncomingChatMessage message={incomingMessage}/>
    </div>
  )
}

export default ChatMessagesList
