import {create} from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    login: async (data) => {
        set({loading: true});
        try {
            await api.post("/auth/login", data);
            set({user: data.email});
        } catch (error) {
            console.error(error.response?.data?.error || "Login failed");
        } finally {
            set({loading: false});
        }
    },
    register: async (data) => {
        set({loading: true})
        try {
            await api.post("/auth/register", data);
            set({user: data.email})
        } catch (error) {
            console.error(error.response?.data?.error || "Registration failed");
        } finally {
            set({loading: false})
        }
    },
    logout: async () => {
        try {
            await api.post("/auth/logout");
            set({user: null});
        } catch (error) {
            console.error(error.response?.data?.error || "Logout failed")
        }
    }
}))

export default useAuthStore;