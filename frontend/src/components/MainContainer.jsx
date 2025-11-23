import useAuthStore from "../store/authStore"

const MainContainer = ({children}) => {
  const {user} = useAuthStore()
  return (
    <main className='flex-1 p-6 text-white overflow-y-auto'>
      <header className="mb-4 text-3xl font-medium">
        Welcome, {user || "User"}
      </header>
      {children}
    </main>
  )
}

export default MainContainer