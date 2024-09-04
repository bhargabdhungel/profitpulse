import React from "react";
import { FileX } from "lucide-react";

export function NoDataState() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="text-center">
        <FileX className="mx-auto h-16 w-16 animate-pulse text-gray-500" />
        <h2 className="mt-4 text-xl font-semibold text-gray-300">
          No Data Found
        </h2>
        <p className="mt-2 text-gray-400">
          There&apos;s no data available to display at the moment.
        </p>
      </div>
    </div>
  );
}
