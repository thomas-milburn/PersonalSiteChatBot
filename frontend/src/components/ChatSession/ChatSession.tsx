import React, { useEffect, useRef } from 'react'
import type ChatMessageType from '../../types/ChatMessageType'
import ChatMessagesList from '../ChatMessagesList/ChatMessagesList'
import SendMessageForm from '../SendMessageForm/SendMessageForm'
import ReCAPTCHA from 'react-google-recaptcha'
import './ChatSession.css'
import type BaseResponse from '../../types/BaseResponse'
import type ContactPreFilled from '../../types/ContactPreFilled'

export enum WebsocketConnectionStatus {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

const ChatSession = (): React.ReactNode => {
  const [websocketStatus, setWebsocketStatus] = React.useState<WebsocketConnectionStatus>(WebsocketConnectionStatus.CONNECTING)
  const [isReceivingMessage, setReceivingMessage] = React.useState<boolean>(false)
  const [isWaitingForRecaptcha, setWaitingForRecaptcha] = React.useState<boolean>(false)
  const [staticMessages, setStaticMessages] = React.useState<BaseResponse[]>([])
  const [incomingMessage, setIncomingMessage] = React.useState<string | undefined>(undefined)
  const [sendMessageInputValue, setSendMessageInputValue] = React.useState<string>('')
  const sendMessageInputValueRef = useRef<string>('')
  const websocketConnectionRef = useRef<WebSocket | undefined>(undefined)
  const recaptchaRef = useRef<any>(undefined)

  useEffect(() => {
    sendMessageInputValueRef.current = sendMessageInputValue
  }, [sendMessageInputValue])

  // Create websocket connection on create
  useEffect(() => {
    const wsProtocol = location.protocol === 'https:' ? 'wss' : 'ws'
    const socket = new WebSocket(`${wsProtocol}://${location.host}/chat`)
    websocketConnectionRef.current = socket

    socket.addEventListener('open', () => {
      setWebsocketStatus(WebsocketConnectionStatus.CONNECTED)
    })

    socket.addEventListener('message', (event) => {
      const baseMessage: BaseResponse = JSON.parse(event.data)

      if (baseMessage.message_type === 'chat_response') {
        // Normal chat message case
        const message: ChatMessageType = baseMessage as ChatMessageType
        if (message.type === 'start') {
          setIncomingMessage(undefined)
          return
        }

        if (['end', 'error'].includes(message.type)) {
          if (message.sender === 'bot') {
            setIncomingMessage(undefined)
            setReceivingMessage(false)
          }
        }

        if (['end', 'error', 'tool'].includes(message.type)) {
          setStaticMessages((currentStaticMessages) => {
            return [...currentStaticMessages, message]
          })
          return
        }

        if (message.type === 'stream') {
          setIncomingMessage((currentIncomingMessage) => {
            if (!currentIncomingMessage) return message.message
            return currentIncomingMessage + message.message
          })
        }
      }

      if (baseMessage.message_type === 'contact_pre_filled') {
        // Show contact form pre-filled with data
        const message: ContactPreFilled = baseMessage as ContactPreFilled
        setStaticMessages((currentStaticMessages) => {
          return [...currentStaticMessages, message]
        })

        setIncomingMessage(undefined)
        setReceivingMessage(false)
      }
    })

    socket.addEventListener('close', () => {
      setWebsocketStatus(WebsocketConnectionStatus.DISCONNECTED)
      setReceivingMessage(false)
      setIncomingMessage(undefined)
    })

    return () => {
      socket.close()
    }
  }, [])

  const handleSendMessage = (): void => {
    if (!websocketConnectionRef.current) {
      return
    }

    setWaitingForRecaptcha(true)
    recaptchaRef.current.execute()
  }

  const handleRecaptchaCallback = (token: string | null): void => {
    if (!websocketConnectionRef.current) {
      return
    }

    if (!token) {
      return
    }

    if (!isWaitingForRecaptcha) {
      return
    }

    recaptchaRef.current.reset()

    setWaitingForRecaptcha(false)
    setReceivingMessage(true)
    setSendMessageInputValue('')

    websocketConnectionRef.current?.send(JSON.stringify({
      message: sendMessageInputValueRef.current,
      g_recaptcha_token: token
    }))
  }

  return (
    <div>
      <ChatMessagesList
        staticMessages={staticMessages}
        incomingMessage={incomingMessage}
        setSendMessageInputValue={setSendMessageInputValue}
        onSendMessage={handleSendMessage}
      />

      <SendMessageForm
        sendMessageInputValue={sendMessageInputValue}
        setSendMessageInputValue={setSendMessageInputValue}
        websocketStatus={websocketStatus}
        isReceivingMessage={isReceivingMessage}
        isWaitingForRecaptcha={isWaitingForRecaptcha}
        onSendMessage={handleSendMessage}
      />

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
        onChange={handleRecaptchaCallback}
        size="invisible"
        ref={recaptchaRef}
      />
    </div>
  )
}

export default ChatSession
