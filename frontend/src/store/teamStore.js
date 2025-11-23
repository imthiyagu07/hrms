import {create} from "zustand";
import api from "../services/api";

const useTeamStore = create((set, get) => ({
    teams: [],
    assign: [],
    isLoading: false,
    error: null,
    fetchTeams: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get("/teams");
            set({ teams: res.data});
        } catch (error) {
            console.error("Fetch teams error:", error);
            set({ error: "Failed to load teams"});
        } finally {
            set({ isLoading: false })
        }
    },
    createTeam: async (data) => {
        set({error: null})
        try {
            const res = await api.post("/teams", data);
            const currentTeams = get().teams
            set({teams: [...currentTeams, res.data]})
        } catch (error) {
            console.error("create teams error:", error);
            set({ error: error.response?.data?.error || "Failed"});
        }
    },
    updateTeam: async (id, data) => {
        set({error: null})
        try {
            const res = await api.put(`/teams/${id}`, data);
            const currentTeams = get().teams
            set({teams: currentTeams.map((e) => (e.id === id ? res.data: e))})
        } catch (error) {
            console.error("update teams error:", error);
            set({ error: error.response?.data?.error || "Failed"});
        }
    },
    deleteTeam: async (id) => {
        set({error: null})
        try {
            await api.delete(`/teams/${id}`);
            const currentTeams = get().teams
            set({teams: currentTeams.filter((e) => e.id !== id)})
        } catch (error) {
            console.error("delete teams error:", error);
            set({ error: error.response?.data?.error || "Failed"});
        }
    },
    assignEmployee: async (teamId, employeeId) => {
        set({error: null})
        try {
            const res = await api.post(`/teams/${teamId}/assign`, { employeeId });
            set({assign: res.data})
        } catch (error) {
            console.error("assign employee to teams error:", error);
            set({ error: error.response?.data?.error || "Failed"});
        }
    },
    unassignEmployee: async (teamId, employeeId) => {
        set({error: null})
        try {
            await api.delete(`/teams/${teamId}/unassign`,{data: {employeeId}});

        } catch (error) {
            console.error("unassign employee to teams error:", error);
            set({ error: error.response?.data?.error || "Failed"});
        }
    },
}))

export default useTeamStore