import React from "react";
import { Loader2 } from "lucide-react";

export default function SuspenseLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-slate-100 text-blue-900">
      <div className="animate-spin rounded-full p-4 bg-blue-100 text-blue-900 mb-4">
        <Loader2 size={36} />
      </div>
      <p className="text-lg font-medium tracking-wide">Loading awesome stuff for you...</p>
      <p className="text-sm text-blue-700 mt-2 italic">Hold tight, just a moment.</p>
    </div>
  );
}
