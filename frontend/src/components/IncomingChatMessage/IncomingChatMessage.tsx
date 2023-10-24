import React from 'react'
import BaseChatMessage from '../BaseChatMessage/BaseChatMessage'
import type ChatMessage from '../../types/ChatMessage'

interface Props {
  message: string | undefined
}

const IncomingChatMessage = ({ message }: Props): React.ReactNode => {
  return message
    ? <BaseChatMessage message={{
      message_type: 'chat_response',
      message,
      sender: 'bot',
      type: 'stream'
    } satisfies ChatMessage} />
    : null
}

export default IncomingChatMessage
