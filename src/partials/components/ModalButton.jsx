import React from 'react'

const ModalButton = ({type, target, onClick, text }) => {

  return (
    <button 
      type="button" 
      data-modal="true" 
      data-target={target} 
      onClick={onClick} 
      className={`btn btn-${type}`}
      >
        <span>{text}</span>
    </button>
  )
}

export default ModalButton