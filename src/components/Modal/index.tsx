import { useState, useEffect, ReactNode } from 'react'
import ReactModal from 'react-modal'

interface IModalProps {
  isOpen: boolean
  setIsOpen: () => void
  children: ReactNode | ReactNode[]
}

const Modal = ({ isOpen, setIsOpen, children }: IModalProps) => {
  const [modalStatus, setModalStatus] = useState(isOpen)

  useEffect(() => {
    setModalStatus(isOpen)
  }, [isOpen])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#f0f0f5',
          color: '#000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
