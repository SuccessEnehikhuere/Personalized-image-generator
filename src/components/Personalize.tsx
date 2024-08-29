import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


interface LocationState {
  imageUrl?: string
}

const Personalize: React.FC = () => {
  
  const location = useLocation()
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')

  
  const imageUrl = (location.state as LocationState)?.imageUrl

  const handlePreview = () => {
    if (imageUrl) {
      navigate('/view', { state: { imageUrl, name } })
    }
  }

  return (
    <div className="flex flex-col items-center">
      {imageUrl && (
        <div className="relative mt-4">
          <img
            src={imageUrl}
            alt="Selected"
            className="rounded w-[400px] h-[500px]"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <h1 className="text-white text-2xl">Thank You</h1>
            <h2 className="text-white text-xl self-end">{name}</h2>
          </div>
        </div>
      )}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="mt-4 p-2 border rounded"
      />
      <button
        onClick={handlePreview}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Preview Card
      </button>
    </div>
  )
}

export default Personalize
