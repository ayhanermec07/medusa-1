"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] rounded-2xl bg-surface-off flex items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-text-muted">
          image
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface-off group shadow-sm">
        {images[selectedImage]?.url && (
          <Image
            src={images[selectedImage].url}
            alt={`Ürün görseli ${selectedImage + 1}`}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-text-main uppercase tracking-wider shadow-sm border border-white/20">
          Çok Satan
        </div>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                  ? "border-primary ring-2 ring-primary/10"
                  : "border-transparent hover:border-primary/50 opacity-80 hover:opacity-100"
                }`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Ürün görseli ${index + 1}`}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
