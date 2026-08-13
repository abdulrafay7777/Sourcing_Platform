import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RequestSourcing from './pages/RequestSourcing'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  const location = useLocation()

  return (
    <ThemeProvider>
      <div className="page-wrapper">
        <Navbar />
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/request-sourcing" element={<RequestSourcing />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        {location.pathname !== '/request-sourcing' && <Footer />}
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  )
}