import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { toast } from 'react-toastify'


interface LocationState {
  imageUrl?: string
  name?: string
}

const View: React.FC = () => {
  const location = useLocation()
  const { imageUrl, name } = location.state as LocationState 
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (imageUrl) {
      const img = new Image()
      img.src = imageUrl
      img.crossOrigin = 'anonymous'
      img.onload = () => setImageLoaded(true)
    }
  }, [imageUrl])

  if (!imageUrl) {
    return <p className="text-red-500">Image URL not found.</p>
  }

  const handleDownload = async () => {
    const cardElement = document.querySelector('#card') as HTMLElement
    if (cardElement) {
      try {
        const canvas = await html2canvas(cardElement, {
          scale: 2,
          useCORS: true,
        })
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'thank-you-card.png'
        link.click()
        toast.success('Image downloaded successfully!')
      } catch (error) {
        console.error('Error generating image:', error)
        toast.error('Error generating image.')
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div id="card" className="relative mt-4 w-[400px] h-[500px]">
        {imageLoaded ? (
          <>
            <img
              src={imageUrl}
              alt="Personalized"
              className="absolute inset-0 w-full h-full object-cover rounded"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <h1 className="text-white text-5xl font-bold absolute top-4 left-[22%] transform shadow-lg font-dmSerif">
                Thank You
              </h1>
              <h2 className="text-white text-5xl font-bold absolute bottom-4 left-1/2 transform -translate-x-1/2 shadow-lg font-dmSerif">
                {name}
              </h2>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Download Card
      </button>
    </div>
  )
}

export default View
