import React, { useContext } from 'react'
import type ReactModal from 'react-modal'
import Modal from 'react-modal'
import './SettingsModal.css'
import Switch from 'react-switch'
import { ChatSessionContext, type ChatSessionContextType } from '../ChatSessionContextProvider/ChatSessionContextProvider'

interface Props {
  isModalOpen: boolean
  closeModal: () => void
}

const modalStyle: ReactModal.Styles = {
  content: {
    backgroundColor: '#353b48',
    padding: '0',
    border: 'solid white 1px',
    width: 'min(700px, 90vw)',
    height: 'min(450px, 90vh)',

    // Centering modal
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.35)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)'
  }
}

const SettingsModal = ({
  isModalOpen,
  closeModal
}: Props): React.ReactNode => {
  const {
    showToolMessages,
    setShowToolMessages
  } = useContext<ChatSessionContextType>(ChatSessionContext)
  return (
    <Modal isOpen={isModalOpen} style={modalStyle}>
      <div className="setting-modal__content">
        <div className="setting-modal__content__header">
          <h1>Settings</h1>

          <button
            type="button"
            onClick={closeModal}
            className="setting-modal__close_button"
          >
            X
          </button>
        </div>

        <div className="setting-modal__content__settings">
          <div className="setting-modal__content__settings_setting">
            <span>Show response from tools 🔧</span>
            <Switch checked={showToolMessages} onChange={setShowToolMessages} />
          </div>
        </div>

        <div className="setting-modal__content__footer">
          <span>
            This website uses <a href="https://react.dev/" target="_blank" rel="noreferrer">React.js</a> for the frontend and <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noreferrer">FastAPI</a> for the backend. It utilises <a href="https://platform.openai.com/docs/models/gpt-3-5" target="_blank" rel="noreferrer">GPT-3.5 Turbo</a> as the large language model. If you&apos;d like to check out the code, you can find this project on <a href="https://github.com/thomas-milburn/PersonalSiteChatBot" target="_blank" rel="noreferrer">GitHub</a>.
          </span>
        </div>

      </div>
    </Modal>
  )
}

export default SettingsModal
