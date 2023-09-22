import React, { useEffect, useRef } from 'react'
import type ChatMessage from '../../types/ChatMessage'
import BaseChatMessage from '../BaseChatMessage/BaseChatMessage'
import IncomingChatMessage from '../IncomingChatMessage/IncomingChatMessage'

const ChatSession = (): React.ReactNode => {
  const [isWebsocketConnected, setWebsocketConnected] = React.useState<boolean>(false)
  const [isReceivingMessage, setReceivingMessage] = React.useState<boolean>(false)
  const [staticMessages, setStaticMessages] = React.useState<ChatMessage[]>([])
  const [incomingMessage, setIncomingMessage] = React.useState<string | undefined>(undefined)
  const websocketConnectionRef = useRef<WebSocket | undefined>(undefined)
  const [sendMessageInputValue, setSendMessageInputValue] = React.useState<string>('')

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

      if (message.type === 'end') {
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

  const handleSendMessage = (message: string): undefined => {
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

    setSendMessageInputValue('')
    setReceivingMessage(true)

    websocketConnectionRef.current?.send(JSON.stringify({
      message,
      g_recaptcha_token: ''
    }))
  }

  return (
    <div>
      <div>Websocket connected: {isWebsocketConnected ? 'true' : 'false'}</div>

      <div>
        {staticMessages.map((message, index) => {
          return (
            <BaseChatMessage message={message} key={index}/>
          )
        })}
        <IncomingChatMessage message={incomingMessage} />
      </div>

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
    </div>
  )
}

export default ChatSession
