import React from 'react'
import './SendMessageFormButton.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonImage: string
  altText: string
}

const SendMessageFormButton = ({
  buttonImage,
  altText,
  ...buttonProps
}: Props): React.ReactNode => {
  return (
    <button {...buttonProps} className="send-message-form-button">
      <img
        src={buttonImage}
        alt={altText}
        className="send-message-form-button__image"
      />
    </button>
  )
}

export default SendMessageFormButton
