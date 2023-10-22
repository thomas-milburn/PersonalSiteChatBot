import React from 'react'
import './SendMessageForm.css'
import SendMessageButton from '../SendMessageButton/SendMessageButton'
import { WebsocketConnectionStatus } from '../ChatSession/ChatSession'
import SendMessageIcon from '../../assets/buttonIcons/settings.svg'
import SendMessageFormButton from '../SendMessageFormButton/SendMessageFormButton'

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
      <SendMessageFormButton
        buttonImage={SendMessageIcon}
        altText="Settings icon"
        title="Settings"
      />

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
