import React, { useEffect } from 'react'
import type contactPreFilled from '../../types/ContactPreFilled'
import BaseChat from '../BaseChat/BaseChat'
import './ContactMessage.css'

interface Props {
  contactDetails: contactPreFilled
}

const ContactMessage = ({
  contactDetails
}: Props): React.ReactNode => {
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false)

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
    console.log('Submitting contact form')
    console.log('Name: ', name)
    console.log('Email: ', email)
    console.log('Message: ', message)
    setHasSubmitted(true)
  }

  return (
    <BaseChat>
      {
        !hasSubmitted && (
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

            <button
              onClick={handleSubmit}
              type="button"
              className="contact-message__submit"
            >
              Submit
            </button>
          </>
        )
      }

      {
        hasSubmitted && (
          <span>Message sent 📧 Thank you! Thomas will get back to you as soon as possible.</span>
        )
      }
    </BaseChat>
  )
}

export default ContactMessage
