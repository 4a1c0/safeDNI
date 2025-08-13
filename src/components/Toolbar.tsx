import React from 'react';

export default function Toolbar() {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800">
      <button className="rounded bg-blue-600 px-3 py-1 text-white">Export</button>
    </div>
  );
}
