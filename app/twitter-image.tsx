import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Meda Endüstri - Dragon Winch Türkiye Distribütörü";
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: "white",
            marginBottom: "30px",
            background: "linear-gradient(90deg, #ffffff 0%, #e5e7eb 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MEDA ENDÜSTRİ
        </div>

        <div
          style={{
            fontSize: 32,
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
            fontSize: 22,
            color: "#d1d5db",
            lineHeight: 1.4,
            maxWidth: "900px",
          }}
        >
          Çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri
        </div>

        <div
          style={{
            fontSize: 18,
            color: "#9ca3af",
            marginTop: "30px",
          }}
        >
          www.medaendustri.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
