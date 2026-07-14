import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import ComparePage from './pages/ComparePage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import FAQPage from './pages/FAQPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/comparisons" element={<ComparePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Route>
    </Routes>
  )
}
