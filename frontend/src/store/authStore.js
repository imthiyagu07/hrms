import {create} from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
    user: null,
    isLogin: false,
    isRegsiter: false,
    isCheckingAuth: true,
    error: null,
    checkAuth: async () => {
        try {
            const res = await api.get("/auth/check");
            set({user: res.data});
        } catch (error) {
            console.error(error);
            set({user: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },
    login: async (data) => {
        set({isLogin: true, error: null});
        try {
            await api.post("/auth/login", data);
            set({user: data.email});
        } catch (error) {
            set({error: error.response?.data?.error || "Login failed"});
        } finally {
            set({isLogin: false});
        }
    },
    register: async (data) => {
        set({isRegsiter: true, error: null})
        try {
            await api.post("/auth/register", data);
            set({user: data.email})
        } catch (error) {
            set({error: error.response?.data?.error || "Registration failed"});
        } finally {
            set({isRegsiter: false})
        }
    },
    logout: async () => {
        try {
            await api.post("/auth/logout");
            set({user: null});
        } catch (error) {
            set({error: error.response?.data?.error || "Logout failed"})
        }
    }
}))

export default useAuthStore;