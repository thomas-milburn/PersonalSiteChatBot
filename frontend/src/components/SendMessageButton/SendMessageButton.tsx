import React, { useMemo } from 'react'
import sendIcon from '../../assets/buttonIcons/send.svg'
import connectingIcon from '../../assets/buttonIcons/connecting.svg'
import lostConnectionIcon from '../../assets/buttonIcons/lostConnection.svg'
import './SendMessageButton.css'
import { WebsocketConnectionStatus } from '../ChatSession/ChatSession'

interface Props {
  websocketStatus: WebsocketConnectionStatus
  isReceivingMessage: boolean
  sendMessageInputValue: string
  onSendMessage: (message: string) => void
}

const SendMessageButton = ({
  websocketStatus,
  isReceivingMessage,
  sendMessageInputValue,
  onSendMessage
}: Props): React.ReactNode => {
  const buttonDisabled: boolean = isReceivingMessage || websocketStatus !== WebsocketConnectionStatus.CONNECTED || sendMessageInputValue === ''
  const [icon, tooltip]: [string, string] = useMemo<[string, string]>((): [string, string] => {
    if (websocketStatus === WebsocketConnectionStatus.CONNECTING) {
      return [connectingIcon, 'Connecting to websocket...']
    }

    if (websocketStatus === WebsocketConnectionStatus.DISCONNECTED) {
      return [lostConnectionIcon, 'Lost connection with websocket']
    }

    if (isReceivingMessage) {
      return ['', 'Receiving message...']
    }

    if (sendMessageInputValue === '') {
      return [sendIcon, 'Enter a message']
    }

    return [sendIcon, 'Send message']
  }, [websocketStatus, isReceivingMessage, sendMessageInputValue])

  return (
    <button
      type="button"
      className="send-message-button"
      onClick={() => {
        if (!buttonDisabled) onSendMessage(sendMessageInputValue)
      }}
      disabled={buttonDisabled}
      title={tooltip}
    >
      <img src={icon} alt="Send message" className="send-message-button__image"/>
    </button>
  )
}

export default SendMessageButton
