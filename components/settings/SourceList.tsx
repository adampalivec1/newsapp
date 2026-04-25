"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Source } from "@/lib/db/queries";

interface Props {
  sources: Source[];
}

const PROVIDER_STYLES: Record<string, string> = {
  gmail: "bg-red-50 text-red-700 border border-red-200",
  outlook: "bg-blue-50 text-blue-700 border border-blue-200",
};

export default function SourceList({ sources }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  async function handleDelete(id: string, displayName: string) {
    if (!confirm(`Delete "${displayName}"?`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/sources/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  async function handleToggle(source: Source) {
    setToggling(source.id);
    try {
      await fetch(`/api/sources/${source.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !source.active }),
      });
      router.refresh();
    } finally {
      setToggling(null);
    }
  }

  if (sources.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-4">
        No sources configured yet. Add one below.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {sources.map((source) => (
        <div
          key={source.id}
          className={`bg-white border rounded-xl px-5 py-4 shadow-sm flex items-start gap-4 transition-opacity ${
            source.active ? "border-gray-200" : "border-gray-100 opacity-60"
          }`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-medium text-gray-900 text-sm">{source.displayName}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                  PROVIDER_STYLES[source.provider] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {source.provider}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {source.category}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">
              {source.senderEmail}
              <span className="mx-1.5 text-gray-300">·</span>
              {source.accountEmail}
              <span className="mx-1.5 text-gray-300">·</span>
              {source.fetchWindowHours}h window
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleToggle(source)}
              disabled={toggling === source.id}
              aria-label={source.active ? "Pause source" : "Activate source"}
              title={source.active ? "Pause" : "Activate"}
              className={`w-10 h-5 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-900 disabled:opacity-50 ${
                source.active ? "bg-gray-900" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  source.active ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>

            <button
              onClick={() => handleDelete(source.id, source.displayName)}
              disabled={deleting === source.id}
              aria-label="Delete source"
              className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50 text-sm"
            >
              {deleting === source.id ? "…" : "✕"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
