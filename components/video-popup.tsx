"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Play } from "lucide-react";

interface VideoPopupProps {
  videoId: string;
  onClose: () => void;
}

export function VideoPopup({ videoId, onClose }: VideoPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // LocalStorage kaydetme işlemi kaldırıldı - her sayfa girişinde video gösterilecek
    onClose();
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      style={{
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
      }}
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-white rounded-t-2xl p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#d84948] to-[#c73e3d] rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Dragon Winch Tanıtım Videosu
                </h3>
                <p className="text-sm text-gray-600">
                  Ürünlerimizi yakından tanıyın
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
              aria-label="Videoyu kapat"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>
        </div>

        {/* Video container */}
        <div className="bg-white rounded-b-2xl overflow-hidden shadow-2xl">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white&cc_load_policy=1`}
              title="Dragon Winch Tanıtım Videosu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
              Dragon Winch ürünleri hakkında daha fazla bilgi için{" "}
              <button
                onClick={handleClose}
                className="text-[#d84948] hover:text-[#c73e3d] font-semibold underline"
              >
                ürünlerimizi inceleyin
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
