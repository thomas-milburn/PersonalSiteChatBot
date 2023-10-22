import React, { useState } from 'react'
import sendMessageIcon from '../../assets/buttonIcons/settings.svg'
import SendMessageFormButton from '../SendMessageFormButton/SendMessageFormButton'
import SettingsModal from '../SettingsModal/SettingsModal'

const SettingsButton = (): React.ReactNode => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false)
  return (
    <>
      <SendMessageFormButton
        buttonImage={sendMessageIcon}
        altText="Settings icon"
        title="Settings"
        onClick={() => {
          setIsSettingsModalOpen(true)
        }}
      />

      <SettingsModal
        isModalOpen={isSettingsModalOpen}
        closeModal={() => { setIsSettingsModalOpen(false) }}
      />
    </>
  )
}

export default SettingsButton
