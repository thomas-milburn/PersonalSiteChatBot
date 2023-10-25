import React from 'react'
import ChatMessage from '../ChatMessage/ChatMessage'
import type ChatMessageType from '../../types/ChatMessageType'

interface Props {
  message: string | undefined
}

const IncomingChatMessage = ({ message }: Props): React.ReactNode => {
  return message
    ? <ChatMessage message={{
      message_type: 'chat_response',
      message,
      sender: 'bot',
      type: 'stream'
    } satisfies ChatMessageType} />
    : null
}

export default IncomingChatMessage
