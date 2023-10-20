import React, { useEffect, useRef } from 'react'
import type ChatMessage from '../../types/ChatMessage'
import ChatMessagesList from '../ChatMessagesList/ChatMessagesList'
import SendMessageForm from '../SendMessageForm/SendMessageForm'
import ReCAPTCHA from 'react-google-recaptcha'
import './ChatSession.css'

export enum WebsocketConnectionStatus {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

const ChatSession = (): React.ReactNode => {
  const [websocketStatus, setWebsocketStatus] = React.useState<WebsocketConnectionStatus>(WebsocketConnectionStatus.CONNECTING)
  const [isReceivingMessage, setReceivingMessage] = React.useState<boolean>(false)
  const [isWaitingForRecaptcha, setWaitingForRecaptcha] = React.useState<boolean>(false)
  const [staticMessages, setStaticMessages] = React.useState<ChatMessage[]>([])
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
    const socket = new WebSocket(`ws://${location.host}/chat`)
    websocketConnectionRef.current = socket

    socket.addEventListener('open', (event) => {
      setWebsocketStatus(WebsocketConnectionStatus.CONNECTED)
    })

    socket.addEventListener('message', (event) => {
      const message: ChatMessage = JSON.parse(event.data)
      if (message.type === 'start') {
        setIncomingMessage(undefined)
        return
      }

      if (['end', 'error', 'tool'].includes(message.type)) {
        if (message.sender === 'bot') {
          setIncomingMessage(undefined)
          setReceivingMessage(false)
        }

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
    })

    socket.addEventListener('close', (event) => {
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
      <ChatMessagesList staticMessages={staticMessages} incomingMessage={incomingMessage}/>

      <SendMessageForm
        sendMessageInputValue={sendMessageInputValue}
        setSendMessageInputValue={setSendMessageInputValue}
        websocketStatus={websocketStatus}
        isReceivingMessage={isReceivingMessage}
        onSendMessage={handleSendMessage}
      />

      <ReCAPTCHA
        sitekey="6LeSKkMoAAAAALnqvmvI5yHABLbGYDueEmnsF9DH"
        onChange={handleRecaptchaCallback}
        size="invisible"
        ref={recaptchaRef}
      />
    </div>
  )
}

export default ChatSession
