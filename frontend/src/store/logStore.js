import {create} from "zustand";
import api from "../services/api";

const useLogStore = create((set) => ({
  logs: [],
  totalPages: 1,
  currentPage: 1,
  error: null,
  fetchLogs: async (page = 1) => {
    set({error: null });
    try {
      const res = await api.get(`/logs?page=${page}`);
      const arr = Array.isArray(res.data.logs) ? res.data.logs : [];
      set({ logs: arr, totalPages: res.data.totalPages || 1, currentPage: res.data.page || 1 });
    } catch (error) {
      console.error("Fetch logs error:", error);
      set({ error: "Failed to load logs" });
    }
  },
}));

export default useLogStore;