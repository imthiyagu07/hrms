import useAuthStore from "../store/authStore";
import {Link} from "react-router-dom"
import { Network, UsersRound, UserRound, ClipboardClock } from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuthStore();
  return (
    <aside className="w-64 bg-neutral-800/80 rounded-tr-4xl rounded-br-4xl text-white p-6 flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <Network className="size-7 mr-2" /> 
        <h1 className="text-4xl tracking-widest">HRMS</h1>
      </div>

      <nav className="flex flex-col space-y-7 mt-2">
        <Link to="/employees" className="text-xl flex items-center gap-2 hover:bg-neutral-700/50 p-2 rounded">
          <UserRound />
          Employees
        </Link>
        <Link to="/teams" className="text-xl flex items-center gap-2 hover:bg-neutral-700/50 p-2 rounded">
          <UsersRound />
          Teams
        </Link>
        <Link to="/logs" className="text-xl flex items-center gap-2 hover:bg-neutral-700/50 p-2 rounded">
          <ClipboardClock />
          Logs
        </Link>
      </nav>

      <button
        onClick={logout}
        className="mt-auto bg-red-500 cursor-pointer hover:bg-red-600 text-white py-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
