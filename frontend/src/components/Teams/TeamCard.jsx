import EditTeamModal from "./EditTeamModal"
import { useState } from "react";
import useTeamStore from "../../store/teamStore";
import AssignModal from "./AssignModal";

const TeamCard = ({team}) => {
  const { deleteTeam, assign} = useTeamStore();
  const [isAssignOpen, setAssignOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleDelete = () => {
    if (!confirm("Delete team?")) return;
    deleteTeam(team.id);
  };
  console.log(assign)
  return (
    <>
      <div className="bg-neutral-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{team.name}</h2>
        <p className="text-neutral-400 text-sm mt-1">
          {team.description || "No description"}
        </p>
        <h3 className="mt-3 text-sm text-neutral-300">Members:</h3>
        {/* <div className="flex flex-wrap gap-2 mt-1">
          {team.Employees?.length ? (
            team.Employees.map((emp) => (
              <span key={emp.id} className="bg-neutral-700 text-xs px-2 py-1 rounded-full">
                {emp.firstName}
              </span>
            ))
          ) : (
            <p className="text-neutral-500 text-xs">No employees assigned</p>
          )}
        </div> */}
        <div className="flex gap-3 mt-4">
          <button onClick={() => setAssignOpen(true)} className="bg-blue-500 cursor-pointer px-3 py-1 rounded text-white">Assign</button>
          <button className="bg-yellow-500 cursor-pointer px-3 py-0.5 rounded text-black" onClick={() => setOpenEdit(true)}>Edit</button>
          <button onClick={handleDelete} className="bg-red-600 cursor-pointer px-3 py-1 rounded text-white">Delete</button>
        </div>
      </div>
      {isAssignOpen && (<AssignModal team={team} close={() => setAssignOpen(false)} />)}
      {openEdit && (<EditTeamModal team={team} onClose={() => setOpenEdit(false)} />)}
    </>
  )
}

export default TeamCard