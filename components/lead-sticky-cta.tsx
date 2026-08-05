"use client";

import { MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "905387344389";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Dragon Winch ürünleri hakkında bilgi almak istiyorum.",
);

export function LeadStickyCta() {
  return (
    <div
      data-lead-sticky
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 items-end"
    >
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full shadow-lg px-4 py-3 transition-transform hover:scale-105"
        aria-label="WhatsApp ile yazın"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline font-medium text-sm">WhatsApp</span>
      </a>
      <a
        href="tel:+905387344389"
        className="flex sm:hidden items-center justify-center w-12 h-12 bg-[#d84948] hover:bg-[#c73e3d] text-white rounded-full shadow-lg"
        aria-label="Hemen ara"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
