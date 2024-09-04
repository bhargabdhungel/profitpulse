import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    </div>
  );
}
