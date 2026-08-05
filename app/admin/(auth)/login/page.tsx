import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="min-h-[75vh] bg-slate-950 px-4 py-20 text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#d84948] p-3">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f38b89]">
              Meda Endüstri
            </p>
            <h1 className="text-2xl font-bold">İçerik yönetimi</h1>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 shadow-2xl">
          <p className="mb-6 text-sm leading-relaxed text-slate-400">
            Bu alan yalnızca yetkili yönetici erişimine açıktır.
          </p>
          <Suspense fallback={<p className="text-slate-400">Hazırlanıyor…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
