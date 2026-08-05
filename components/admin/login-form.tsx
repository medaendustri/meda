"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [csrf, setCsrf] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetch("/api/auth/csrf", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setCsrf(data.token || ""))
      .catch(() => setError("Güvenlik anahtarı alınamadı."));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf,
      },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error || "Giriş başarısız.");
      setPending(false);
      return;
    }

    const requested = searchParams.get("next");
    router.replace(requested?.startsWith("/admin") ? requested : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          Kullanıcı adı
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          maxLength={80}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-[#d84948] focus:ring-2 focus:ring-[#d84948]/20"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          Parola
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={256}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-[#d84948] focus:ring-2 focus:ring-[#d84948]/20"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-950/70 p-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !csrf}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d84948] px-4 py-3 font-bold text-white transition hover:bg-[#c73e3d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <LockKeyhole className="h-5 w-5" />
        )}
        Güvenli giriş
      </button>
    </form>
  );
}
