import React from 'react'
import './SendMessageForm.css'
import SendMessageButton from '../SendMessageButton/SendMessageButton'
import { WebsocketConnectionStatus } from '../ChatSession/ChatSession'
import SettingsButton from '../SettingsButton/SettingsButton'

interface Props {
  sendMessageInputValue: string
  setSendMessageInputValue: (value: string) => void
  websocketStatus: WebsocketConnectionStatus
  isReceivingMessage: boolean
  isWaitingForRecaptcha: boolean
  onSendMessage: (message: string) => void
}

const SendMessageForm = ({
  sendMessageInputValue,
  setSendMessageInputValue,
  websocketStatus,
  isReceivingMessage,
  isWaitingForRecaptcha,
  onSendMessage
}: Props): React.ReactNode => {
  const handleSendMessage = (message: string): void => {
    onSendMessage(message)
  }

  return (
    <div className="send-message-form">
      <SettingsButton />

      <input
        type="text"
        className="send-message-form__input"
        value={sendMessageInputValue}
        onChange={(event) => {
          setSendMessageInputValue(event.target.value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSendMessage(sendMessageInputValue)
          }
        }}
        disabled={websocketStatus === WebsocketConnectionStatus.DISCONNECTED}
      />

      <SendMessageButton
        onSendMessage={handleSendMessage}
        websocketStatus={websocketStatus}
        isReceivingMessage={isReceivingMessage}
        isWaitingForRecaptcha={isWaitingForRecaptcha}
        sendMessageInputValue={sendMessageInputValue}
      />
    </div>
  )
}

export default SendMessageForm
