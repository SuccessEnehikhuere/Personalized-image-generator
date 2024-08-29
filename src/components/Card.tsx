import React from 'react'

interface ImageProps {
  id: string
  urls: {
    small: string
    regular: string
  }
  alt_description: string
}

interface CardProps {
  image: ImageProps
  onClick: (url: string) => void
}

export const Card: React.FC<CardProps> = ({ image, onClick }) => {
  const handleImageClick = (url: string) => {
    onClick(url)
  }

  return (
    <img
      key={image.id}
      src={image.urls.small}
      alt={image.alt_description}
      onClick={() => handleImageClick(image.urls.regular)}
      className="cursor-pointer w-80 h-60 mx-auto rounded-lg transition-transform duration-500 hover:scale-105"
    />
  )
}
