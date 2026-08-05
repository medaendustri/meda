import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İçerik Yönetimi",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body:has([data-admin-shell]) header,
            body:has([data-admin-shell]) footer,
            body:has([data-admin-shell]) [data-lead-sticky] {
              display: none !important;
            }
            body:has([data-admin-shell]) {
              background: #020617;
            }
          `,
        }}
      />
      <div data-admin-shell>{children}</div>
    </>
  );
}
