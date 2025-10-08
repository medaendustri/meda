"use client";

import { useState, useEffect } from "react";
import { VideoPopup } from "./video-popup";

export function VideoPopupContainer() {
  const [showVideo, setShowVideo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Her sayfa girişinde videoyu göster (localStorage kontrolü kaldırıldı)
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [mounted]);

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  // Component mount olmadan önce hiçbir şey render etme
  if (!mounted || !showVideo) return null;

  return <VideoPopup videoId="fv4IfKF6WrE" onClose={handleCloseVideo} />;
}
