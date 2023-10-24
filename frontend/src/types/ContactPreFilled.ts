import type BaseResponse from './BaseResponse'

interface ContactPreFilled extends BaseResponse {
  suggested_message: string
  name: string | null
  email: string | null
}

export default ContactPreFilled
