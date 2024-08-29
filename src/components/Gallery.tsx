import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Card } from './Card'

interface Image {
  id: string
  urls: {
    small: string
    regular: string
  }
  alt_description: string
}

const url = `https://api.unsplash.com/photos/random`

const Gallery: React.FC = () => {
  const navigate = useNavigate()

  const handleImageClick = (imageUrl: string) => {
    navigate('/personalize', { state: { imageUrl } })
  }

  const {
    data: images,
    refetch,
    isError,
    isLoading,
  } = useQuery<Image[], Error>({
    queryKey: ['photos'],
    queryFn: async () => {
      const response = await axios.get<Image[]>(url, {
        headers: {
          Authorization:
            'Client-ID Ezjx4AAFEvt1drstSaNlntvfpFhWSTgeMK0LysChSzA',
        },
        params: {
          count: 4,
        },
      })
      return response.data
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })

  return (
    <div className="flex flex-col items-center justify-center">
      {isError && <p className="text-red-500">Error fetching images.</p>}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center rounded-3xl">
        {Array.isArray(images) &&
          images.map((image) => (
            <Card
              key={image.id}
              image={image}
              onClick={() => handleImageClick(image.urls.regular)}
            />
          ))}
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => refetch()}
          className="mt-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded place-content-center items-center"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Refresh Images'}
        </button>
      </div>
    </div>
  )
}

export default Gallery
