import type BaseResponse from './BaseResponse'

interface ChatMessageType extends BaseResponse {
  type: 'start' | 'stream' | 'tool' | 'end' | 'error'
  message: string
  sender: 'bot' | 'human'
}

export default ChatMessageType
