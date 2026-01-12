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

    // Oturum süresince sadece bir kez göster (sessionStorage)
    const hasSeenVideo = sessionStorage.getItem("hasSeenVideo");
    if (hasSeenVideo) return;

    const timer = setTimeout(() => {
      setShowVideo(true);
      sessionStorage.setItem("hasSeenVideo", "true");
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
