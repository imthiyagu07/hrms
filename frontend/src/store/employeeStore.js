import { create } from "zustand";
import api from "../services/api";

const useEmployeeStore = create((set, get) => ({
    employees: [],
    isLoading: false,
    error: null,
    fetchEmployees: async () => {
        set({ isLoading: true, error: null});
        try {
            const res = await api.get("/employees");
            set({ employees: res.data })
        } catch (error) {
            console.error("Fetch employees error:", error);
            set({ error: "Failed to load employees"});
        } finally {
            set({ isLoading: false })
        }
    },
    createEmployee: async (data) => {
        set({error: null})
        try {
            const res = await api.post("/employees", data)
            const currentEmployees = get().employees
            set({employees: [...currentEmployees, res.data]})
        } catch (error) {
            console.error("Create employees error:", error);
            set({ error: error.response?.data?.error || "Failed" });
        }
    },
    updateEmployee: async (id, data) => {
        set({error: null})
        try {
            const res = await api.put(`/employees/${id}`, data);
            const currentEmployees = get().employees
            set({employees: currentEmployees.map((e) => (e.id === id ? res.data: e))})
        } catch (error) {
            console.error("update employees error:", error);
            set({ error: error.response?.data?.error || "Failed"});
        }
    },
    deleteEmployee: async (id) => {
        set({error: null})
        try {
            await api.delete(`/employees/${id}`)
            const currentEmployees = get().employees
            set({employees: currentEmployees.filter((e) => e.id !== id)})
        } catch (error) {
            console.error("delete employees error:", error);
            set({ error: error.response?.data?.error || "Failed"});
        }
    }
}))

export default useEmployeeStore;