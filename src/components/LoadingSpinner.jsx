import React from 'react'

const LoadingSpinner = ({ text }) => {
  return (
    <>
      <div >
         <h2 className="wrap">{text || 'Please wait...'}</h2>
      </div>
    </>
  )
}

export default LoadingSpinner
