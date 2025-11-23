import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import EmployeesPage from "./pages/EmployeesPage";
import TeamsPage from "./pages/TeamsPage";
import LogsPage from "./pages/LogsPage";

const App = () => {
  const {checkAuth, isCheckingAuth, user} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to={"/employees"} />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/employees"} />} />
        <Route path="/" element={user ? <DashboardPage /> : <Navigate to={"/login"} />}>
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="logs" element={<LogsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App