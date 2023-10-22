import React from 'react'
import type ReactModal from 'react-modal'
import Modal from 'react-modal'
import './SettingsModal.css'
import Switch from 'react-switch'

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
            <Switch checked={true} onChange={() => {}} />
          </div>
        </div>

      </div>
    </Modal>
  )
}

export default SettingsModal
