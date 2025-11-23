import Sidebar from "../components/Sidebar"
import MainContainer from "../components/MainContainer"
import { Outlet } from "react-router-dom"

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-row">
      <Sidebar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  )
}

export default DashboardPage