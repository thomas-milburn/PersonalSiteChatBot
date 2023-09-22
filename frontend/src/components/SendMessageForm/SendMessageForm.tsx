import React from 'react'
import './SendMessageForm.css'

interface Props {
  isWebsocketConnected: boolean
  isReceivingMessage: boolean
  onSendMessage: (message: string) => void
}

const SendMessageForm = ({
  isWebsocketConnected,
  isReceivingMessage,
  onSendMessage
}: Props): React.ReactNode => {
  const [sendMessageInputValue, setSendMessageInputValue] = React.useState<string>('')

  const handleSendMessage = (message: string): void => {
    setSendMessageInputValue('')
    onSendMessage(message)
  }

  return (
    <div className="send-message-form">
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
        }
        }
      />
      <button
        type="button"
        className="send-message-form__button"
        onClick={() => {
          handleSendMessage(sendMessageInputValue)
        }}
        disabled={isReceivingMessage || !isWebsocketConnected || sendMessageInputValue === ''}
      >
        Send
      </button>
    </div>
  )
}

export default SendMessageForm
