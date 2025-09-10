import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Meda Endüstri - Dragon Winch Türkiye Distribütörü";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "white",
              marginRight: "20px",
              background: "linear-gradient(90deg, #ffffff 0%, #e5e7eb 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MEDA ENDÜSTRİ
          </div>
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: "600",
            color: "#fbbf24",
            marginBottom: "20px",
            lineHeight: 1.2,
          }}
        >
          Dragon Winch Türkiye Distribütörü
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#d1d5db",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "40px",
            fontSize: 20,
            color: "#9ca3af",
          }}
        >
          15+ Yıllık Deneyim • Profesyonel Hizmet • Teknik Destek
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
