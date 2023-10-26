import React from 'react'
import './App.css'
import ChatSession from '../ChatSession/ChatSession'
import ChatSessionContextProvider from '../ChatSessionContextProvider/ChatSessionContextProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = (): React.ReactNode => {
  return (
    <div>
      <ChatSessionContextProvider>
        <ChatSession />
      </ChatSessionContextProvider>

      <ToastContainer />
    </div>
  )
}

export default App
