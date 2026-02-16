import { Outlet } from "react-router"
import { Navbar } from "../custom/navbar"

export const CentralLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-360 mx-auto px-4 py-6 md:px-6">
        <Outlet/>
      </main>
    </div>



  )
}
