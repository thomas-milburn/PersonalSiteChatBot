import React from 'react'
import './BaseChat.css'

interface Props {
  children: React.ReactNode
}

const BaseChat = ({ children }: Props): React.ReactNode => {
  return (
    <div className="base-chat">
      {children}
    </div>
  )
}

export default BaseChat
