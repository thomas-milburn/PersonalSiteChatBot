import React from 'react'
import './ChatIntroduction.css'

const ChatIntroduction = (): React.ReactNode => {
  return (
    <div className="chat-introduction">
      <div>
        This site is protected by reCAPTCHA and the Google <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noreferrer"
      >Privacy Policy</a> and <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noreferrer"
      >Terms of Service</a> apply.
      </div>
    </div>
  )
}

export default ChatIntroduction
