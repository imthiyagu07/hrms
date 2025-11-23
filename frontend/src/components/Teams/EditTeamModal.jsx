import useTeamStore from "../../store/teamStore"
import { useState } from "react";

const EditTeamModal = ({team, onClose}) => {
    const { updateTeam } = useTeamStore();
    const [formData, setFormData] = useState({ name: team.name, description: team.description || "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        updateTeam(team.id, formData);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-neutral-900 p-6 rounded-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Edit Team</h2>
                <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    <span className="text-sm">Team Name</span>
                    <input
                    type="text"
                    className="w-full p-2 mt-1 bg-neutral-800 rounded outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-sm">Description</span>
                    <textarea
                    className="w-full p-2 mt-1 bg-neutral-800 rounded outline-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </label>

                <div className="flex justify-end gap-2">
                    <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-neutral-700 rounded"
                    >
                    Cancel
                    </button>

                    <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                    >
                    Update
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default EditTeamModal