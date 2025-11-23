import useTeamStore from "../store/teamStore";
import PageLoader from "../components/PageLoader";
import { useEffect, useState } from "react";
import TeamCard from "../components/Teams/TeamCard";
import TeamModal from "../components/Teams/TeamModal";

const TeamsPage = () => {
  const { teams, fetchTeams, isLoading, error } = useTeamStore();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  if (isLoading) return <PageLoader />

  return (
    <main className="text-white">
      {openModal && <TeamModal onClose={() => setOpenModal(false)} />}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Teams</h1>
        <button onClick={() => setOpenModal(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">+ Create Team</button>
      </div>
      {error && <p className="text-red-600 bg-neutral-900 border border-neutral-700 text-center py-1.5 rounded-md mb-5">{error}</p>}
      {teams.length === 0 ? (
        <div className="text-center mt-20">
          <h1 className="text-neutral-400 text-2xl">No teams created yet.</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </main>
  )
}

export default TeamsPage