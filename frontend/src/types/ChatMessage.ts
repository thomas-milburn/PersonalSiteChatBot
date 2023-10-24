import type BaseResponse from './BaseResponse'

interface ChatMessage extends BaseResponse {
  type: 'start' | 'stream' | 'task' | 'end' | 'error'
  message: string
  sender: 'bot' | 'human'
}

export default ChatMessage
