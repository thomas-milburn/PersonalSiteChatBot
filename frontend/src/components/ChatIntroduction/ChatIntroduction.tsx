import React from 'react'
import './ChatIntroduction.css'
import meImage from '../../assets/me.png'

const ChatIntroduction = (): React.ReactNode => {
  return (
    <div className="chat-introduction">
      <div className="chat-introduction__section">
        <img src={meImage} alt="Photo of me" className="chat-introduction__photo_of_me"/>
        <h1>Thomas Milburn</h1>
        <p>Hey! Thank you for checking out my personal website 😄</p>
        <p>Please go ahead and ask my personal AI assistant any questions you have about me by <b>typing you&apos;re
          question in the input box below</b></p>
      </div>

      <div className="chat-introduction__section chat-introduction__section--gray">
        <p>The assistant can sometimes provide inaccurate information. To send a message to me for verification, please ask the assistant to &quot;contact Thomas&quot;</p>
        <p>
          This site is protected by reCAPTCHA and the Google <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >Privacy Policy</a> and <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noreferrer"
        >Terms of Service</a> apply.
        </p>
      </div>
    </div>
  )
}

export default ChatIntroduction
