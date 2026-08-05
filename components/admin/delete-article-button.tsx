"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteArticleButton({ id, title }: { id: number; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function remove() {
    if (!window.confirm(`“${title}” silinsin mi?`)) return;
    setPending(true);
    const csrfResponse = await fetch("/api/auth/csrf", { cache: "no-store" });
    const { token } = await csrfResponse.json();
    const response = await fetch(`/api/admin/articles/${id}`, {
      method: "DELETE",
      headers: { "X-CSRF-Token": token },
    });
    if (!response.ok) {
      window.alert("Haber silinemedi.");
      setPending(false);
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={pending}
      aria-label={`${title} haberini sil`}
      className="rounded-lg border border-red-900/60 p-2 text-red-300 transition hover:bg-red-950 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
