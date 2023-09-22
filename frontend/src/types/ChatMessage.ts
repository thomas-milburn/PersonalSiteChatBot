interface ChatMessage {
  type: 'start' | 'stream' | 'task' | 'end' | 'error'
  message: string
  sender: 'bot' | 'human'
}

export default ChatMessage
