import React from "react";

const LogItem = React.memo(({ log }) => {
  return (
    <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-700">
      <p className="text-sm text-blue-400">{log.action}</p>

      <p className="text-xs text-neutral-400 mt-1">
        By: {log.User?.name || "Unknown"} ({log.User?.email})
      </p>

      <p className="text-xs text-neutral-500 mt-1">
        At: {new Date(log.createdAt).toLocaleString()}
      </p>

      {log.meta && (
        <pre className="text-xs text-neutral-500 mt-2 bg-neutral-950 p-2 rounded">
          {JSON.stringify(log.meta, null, 2)}
        </pre>
      )}
    </div>
  );
});

export default LogItem;
