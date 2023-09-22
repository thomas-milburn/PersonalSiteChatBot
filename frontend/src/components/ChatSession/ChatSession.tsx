import React, { useEffect, useRef } from 'react'
import type ChatMessage from '../../types/ChatMessage'
import ChatMessagesList from '../ChatMessagesList/ChatMessagesList'
import SendMessageForm from '../SendMessageForm/SendMessageForm'

const ChatSession = (): React.ReactNode => {
  const [isWebsocketConnected, setWebsocketConnected] = React.useState<boolean>(false)
  const [isReceivingMessage, setReceivingMessage] = React.useState<boolean>(false)
  const [staticMessages, setStaticMessages] = React.useState<ChatMessage[]>([])
  const [incomingMessage, setIncomingMessage] = React.useState<string | undefined>(undefined)
  const websocketConnectionRef = useRef<WebSocket | undefined>(undefined)

  // Create websocket connection on create
  useEffect(() => {
    const socket = new WebSocket(`ws://${location.host}/chat`)
    websocketConnectionRef.current = socket

    socket.addEventListener('open', (event) => {
      setWebsocketConnected(true)
    })

    socket.addEventListener('message', (event) => {
      const message: ChatMessage = JSON.parse(event.data)
      if (message.type === 'start') {
        setIncomingMessage(undefined)
        return
      }

      if (['end', 'error', 'tool'].includes(message.type)) {
        setIncomingMessage(undefined)
        setReceivingMessage(false)
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

    return () => {
      socket.close()
    }
  }, [])

  const handleSendMessage = (message: string): void => {
    if (!websocketConnectionRef.current) {
      return
    }

    setStaticMessages((currentStaticMessages) => {
      return [...currentStaticMessages, {
        sender: 'human',
        message,
        type: 'end'
      }]
    })

    setReceivingMessage(true)

    websocketConnectionRef.current?.send(JSON.stringify({
      message,
      g_recaptcha_token: ''
    }))
  }

  return (
    <div>
      <ChatMessagesList staticMessages={staticMessages} incomingMessage={incomingMessage}/>

      <SendMessageForm
        isWebsocketConnected={isWebsocketConnected}
        isReceivingMessage={isReceivingMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}

export default ChatSession
