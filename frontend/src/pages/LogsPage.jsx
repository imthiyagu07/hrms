import { useEffect, useCallback } from "react";
import useLogStore from "../store/logStore";
import LogItem from "../components/LogItem";

const LogsPage = () => {
  const { logs, fetchLogs, currentPage, totalPages} = useLogStore();

  useEffect(() => {
    fetchLogs(1);
  }, [fetchLogs]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) fetchLogs(currentPage + 1);
  }, [currentPage, totalPages, fetchLogs]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) fetchLogs(currentPage - 1);
  }, [currentPage, fetchLogs]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-4">Activity Logs</h1>

      <div className="bg-neutral-800 p-4 rounded-xl">
        {logs.length === 0 ? (
          <p className="text-neutral-400">No logs available.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <LogItem key={log.id} log={log} />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 bg-neutral-700 rounded disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            Previous
          </button>

          <span className="text-neutral-300">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-neutral-700 rounded disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogsPage