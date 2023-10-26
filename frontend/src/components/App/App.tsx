import React from 'react'
import './App.css'
import ChatSession from '../ChatSession/ChatSession'
import ChatSessionContextProvider from '../ChatSessionContextProvider/ChatSessionContextProvider'

const App = (): React.ReactNode => {
  return (
    <div>
      <ChatSessionContextProvider>
        <ChatSession />
      </ChatSessionContextProvider>
    </div>
  )
}

export default App
