import React, { useMemo } from 'react'
import './InitialSuggestedMessagesRow.css'

interface Props {
  messageHistoryLength: number
  setSendMessageInputValue: (value: string) => void
  onSendMessage: () => void
}

const InitialSuggestedMessagesRow = ({
  messageHistoryLength,
  setSendMessageInputValue,
  onSendMessage
}: Props): React.ReactNode | null => {
  const suggestedMessages = [
    'Hey, what can you do?',
    'Which modules did Thomas take in his first year of University?',
    'Tools Thomas uses for frontend development?',
    'Has Thomas got any backend experience?',
    'What work experience does Thomas have?',
    'What is his most recent GitHub commit?',
    'Can you link me to Thomas\'s LinkedIn profile?',
    'What are Thomas\'s hobbies?',
    'Has Thomas worked in a team before?',
    'Which university does Thomas attend?',
    'What A-Level grades did Thomas achieve?'
  ]

  const threeRandomMessages = useMemo<string[]>(() => {
    return suggestedMessages.sort(() => 0.5 - Math.random()).slice(0, 3)
  }, [])

  const handleSendMessage = (message: string): void => {
    setSendMessageInputValue(message)
    onSendMessage()
  }

  return messageHistoryLength === 0
    ? (
      <div className="initial-suggested-messages-row">
        {threeRandomMessages.map((message, index) => (
          <button
            type="button"
            key={index}
            className="initial-suggested-messages-row__button"
            onClick={() => { handleSendMessage(message) }}
          >
            {message}
          </button>
        ))}
      </div>
      )
    : null
}

export default InitialSuggestedMessagesRow
