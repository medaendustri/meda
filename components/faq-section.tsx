import { winchFaqItems } from "@/lib/faq";

export function FaqSection() {
  return (
    <section className="bg-gray-50 py-16" aria-labelledby="faq-title">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#d84948]">
            Sık sorulan sorular
          </p>
          <h2
            id="faq-title"
            className="text-3xl font-bold text-gray-900 md:text-4xl"
          >
            Vinç seçimi hakkında merak edilenler
          </h2>
        </div>

        <div className="space-y-3">
          {winchFaqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-2xl font-light text-[#d84948] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="border-t border-gray-100 px-5 py-4 leading-relaxed text-gray-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
