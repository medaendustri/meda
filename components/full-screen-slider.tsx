"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface FullScreenSliderProps {
  images: Array<{
    id: number
    src: string
    alt: string
  }>
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export function FullScreenSlider({ images, isOpen, onClose, initialIndex = 0 }: FullScreenSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          break
        case "ArrowRight":
          setCurrentIndex((prev) => (prev + 1) % images.length)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, images.length, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Image */}
      <div className="flex items-center justify-center h-full p-4">
        <div className="relative max-w-7xl max-h-full w-full h-full">
          <Image
            src={images[currentIndex]?.src || "/placeholder.svg"}
            alt={images[currentIndex]?.alt || "Product image"}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-3"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-3"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-[#d84948]" : "border-white/30 hover:border-white/60"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
