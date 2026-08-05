export const winchFaqItems = [
  {
    question: "Çekme vinci tamburu nasıl seçilir?",
    answer:
      "Çekme kapasitesi, güç kaynağı (12V/24V/hidrolik), halat tipi ve montaj alanına göre seçim yapılır. Meda Endüstri teknik ekibi uygulamanıza uygun Dragon Winch modelini belirlemenize yardımcı olur.",
  },
  {
    question: "Dragon Winch Türkiye distribütörü kimdir?",
    answer:
      "Meda Endüstri, Dragon Winch markasının Türkiye yetkili distribütörüdür. Satış, stok, yedek parça ve teknik destek hizmeti sunar.",
  },
  {
    question: "Fiyat teklifi nasıl alabilirim?",
    answer:
      "İletişim formunu doldurarak, +90 538 734 4389 numaralı telefonu arayarak veya WhatsApp üzerinden teklif talep edebilirsiniz.",
  },
  {
    question: "Hangi sektörlere hizmet veriyorsunuz?",
    answer:
      "Denizcilik, savunma sanayi, endüstriyel sanayi ve tarım sektörlerinde vinç ve kurtarma sistemleri sunuyoruz.",
  },
];

export function buildFaqSchema(items = winchFaqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
