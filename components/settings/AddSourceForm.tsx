"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DIGEST_CATEGORIES } from "@/lib/ai/types";
import type { DigestCategory } from "@/lib/ai/types";

interface FormState {
  displayName: string;
  senderEmail: string;
  provider: "gmail" | "outlook";
  accountEmail: string;
  category: DigestCategory;
  fetchWindowHours: number;
}

const INITIAL: FormState = {
  displayName: "",
  senderEmail: "",
  provider: "gmail",
  accountEmail: "",
  category: "EU Politics",
  fetchWindowHours: 20,
};

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 " +
  "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent " +
  "placeholder:text-gray-400";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";

export default function AddSourceForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(INITIAL);
        router.refresh();
      } else {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Something went wrong");
      }
    } catch {
      setError("Network error – please try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Display name</label>
          <input
            className={inputClass}
            placeholder="Politico Brussels Playbook"
            value={form.displayName}
            onChange={(e) => set("displayName", e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Sender email</label>
          <input
            className={inputClass}
            type="email"
            placeholder="playbook@politico.eu"
            value={form.senderEmail}
            onChange={(e) => set("senderEmail", e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Provider</label>
          <select
            className={inputClass}
            value={form.provider}
            onChange={(e) => set("provider", e.target.value as "gmail" | "outlook")}
          >
            <option value="gmail">Gmail</option>
            <option value="outlook">Outlook</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Account email</label>
          <input
            className={inputClass}
            type="email"
            placeholder="you@gmail.com"
            value={form.accountEmail}
            onChange={(e) => set("accountEmail", e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) => set("category", e.target.value as DigestCategory)}
          >
            {DIGEST_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Fetch window (hours)</label>
          <input
            className={inputClass}
            type="number"
            min={1}
            max={72}
            value={form.fetchWindowHours}
            onChange={(e) => set("fetchWindowHours", Number(e.target.value))}
            required
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="bg-gray-900 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {submitting ? "Adding…" : "Add source"}
        </button>
      </div>
    </form>
  );
}
