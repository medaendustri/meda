"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">Hata!</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bir şeyler yanlış gitti
          </h2>
          <p className="text-gray-600 mb-8">
            Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors mr-4"
          >
            Tekrar Dene
          </button>

          <Link
            href="/"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Hata Detayları (Geliştirme Modu)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
