import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

const App = () => {
  const {checkAuth, isCheckingAuth, user} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <DashboardPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App