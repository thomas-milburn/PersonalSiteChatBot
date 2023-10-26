import React, { useEffect } from 'react'
import type contactPreFilled from '../../types/ContactPreFilled'
import BaseChat from '../BaseChat/BaseChat'
import './ContactMessage.css'
import { toast } from 'react-toastify'

interface Props {
  contactDetails: contactPreFilled
}

enum SendingMessageState {
  NOT_SENT,
  SENDING,
  SENT,
  ERROR
}

const ContactMessage = ({
  contactDetails
}: Props): React.ReactNode => {
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const [sendingMessageState, setSendingMessageState] = React.useState<SendingMessageState>(SendingMessageState.NOT_SENT)

  // Set the name, email, and suggested message to the values from the contactDetails prop
  useEffect(() => {
    if (contactDetails.email !== null) {
      setEmail(contactDetails.email)
    }

    if (contactDetails.name !== null) {
      setName(contactDetails.name)
    }

    setMessage(contactDetails.suggested_message)
  }, [])

  const handleSubmit = (): void => {
    // Make sure no fields are empty
    if (name === '') {
      toast.error('Please enter your name')
      return
    }

    if (email === '') {
      toast.error('Please enter your email')
      return
    }

    if (message === '') {
      toast.error('Please enter a message')
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email')
      return
    }

    // Send message via discord webhook
    const webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_URL as string
    const webhookBody = {
      content: `**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`
    }

    setSendingMessageState(SendingMessageState.SENDING)

    void fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookBody)
    }).then(() => {
      setSendingMessageState(SendingMessageState.SENT)
    }).catch(() => {
      setSendingMessageState(SendingMessageState.ERROR)
    })
  }

  return (
    <BaseChat>
      {
        sendingMessageState !== SendingMessageState.SENT && (
          <>
            <span className="contact-message__title">Contact Thomas</span>

            <span className="contact-message__label">Name:</span>
            <input
              type="text"
              value={name}
              className="contact-message__input"
              onChange={(e) => {
                setName(e.target.value)
              }}/>

            <span className="contact-message__label">Email:</span>
            <input
              type="email"
              value={email}
              className="contact-message__input"
              onChange={(e) => {
                setEmail(e.target.value)
              }}/>

            <span className="contact-message__label">Message:</span>
            <textarea
              value={message}
              className="contact-message__input"
              onChange={(e) => {
                setMessage(e.target.value)
              }}/>

            {
              sendingMessageState === SendingMessageState.ERROR && (
                <span className="contact-message__error">An error occurred while sending the message. Please try again.</span>
              )
            }

            <button
              onClick={handleSubmit}
              type="button"
              className="contact-message__submit"
              disabled={sendingMessageState === SendingMessageState.SENDING}
            >
              {
                sendingMessageState === SendingMessageState.SENDING ? 'Sending...' : 'Send'
              }
            </button>
          </>
        )
      }

      {
        sendingMessageState === SendingMessageState.SENT && (
          <span>Message sent 📧 Thank you! Thomas will get back to you as soon as possible.</span>
        )
      }
    </BaseChat>
  )
}

export default ContactMessage
