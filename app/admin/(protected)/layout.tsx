import Link from "next/link";
import { FileText, LayoutDashboard, Package, ShieldCheck } from "lucide-react";
import { requireAdminPage } from "@/lib/auth/session";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminPage();

  return (
    <div className="min-h-[75vh] bg-slate-950 text-white">
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-[#e45a58]" />
            <div>
              <p className="font-bold">Meda İçerik Merkezi</p>
              <p className="text-xs text-slate-400">Güvenli yönetim alanı</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Admin menüsü" className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <LayoutDashboard className="h-5 w-5" />
            Genel bakış
          </Link>
          <Link
            href="/admin/haberler"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <FileText className="h-5 w-5" />
            Haberler
          </Link>
          <Link
            href="/admin/urunler"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <Package className="h-5 w-5" />
            Ürünler
          </Link>
        </nav>
        <section>{children}</section>
      </div>
    </div>
  );
}
