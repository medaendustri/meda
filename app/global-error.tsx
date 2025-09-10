"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-6xl font-bold text-red-500 mb-4">
              Kritik Hata!
            </h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Uygulama yanıt vermiyor
            </h2>
            <p className="text-gray-600 mb-8">
              Sistem hatası oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button
              onClick={reset}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
