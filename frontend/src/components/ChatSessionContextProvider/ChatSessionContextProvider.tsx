import React from 'react'

export interface ChatSessionContextType {
  showToolMessages: boolean
  setShowToolMessages: (showToolMessages: boolean) => void
}

export const ChatSessionContext = React.createContext<ChatSessionContextType>({
  showToolMessages: false,
  setShowToolMessages: () => {
  }
})

interface Props {
  children: React.ReactNode
}

const ChatSessionContextProvider = ({ children }: Props): React.ReactNode => {
  const [showToolMessages, setShowToolMessages] = React.useState<boolean>(false)

  return (
    <ChatSessionContext.Provider
      value={{
        showToolMessages,
        setShowToolMessages
      }}
    >
      {children}
    </ChatSessionContext.Provider>
  )
}

export default ChatSessionContextProvider
