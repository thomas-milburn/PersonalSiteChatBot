import React from 'react'

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
    <div>
      <div>Send message</div>
      <input
        type="text"
        value={sendMessageInputValue}
        onChange={(event) => {
          setSendMessageInputValue(event.target.value)
        }}
      />
      <button
        type="button"
        onClick={() => {
          handleSendMessage(sendMessageInputValue)
        }}
        disabled={isReceivingMessage || !isWebsocketConnected || sendMessageInputValue === ''}
      >Send
      </button>
    </div>
  )
}

export default SendMessageForm
