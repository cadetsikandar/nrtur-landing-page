import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useHashScroll } from '../hooks/useHashScroll'

export default function Layout() {
  useHashScroll()

  return (
    <div className="min-h-screen bg-[#07070f] text-white overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
