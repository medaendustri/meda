"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    const csrfResponse = await fetch("/api/auth/csrf", { cache: "no-store" });
    const { token } = await csrfResponse.json();
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "X-CSRF-Token": token },
    });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-red-500/50 hover:text-red-300 disabled:opacity-50"
    >
      <LogOut className="h-4 w-4" />
      Çıkış
    </button>
  );
}
