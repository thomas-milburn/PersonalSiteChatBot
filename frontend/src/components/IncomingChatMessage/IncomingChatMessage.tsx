import React from 'react'
import BaseChatMessage from '../BaseChatMessage/BaseChatMessage'

interface Props {
  message: string | undefined
}

const IncomingChatMessage = ({ message }: Props): React.ReactNode => {
  return message
    ? <BaseChatMessage message={{
      message,
      sender: 'bot',
      type: 'stream'
    }} />
    : null
}

export default IncomingChatMessage
