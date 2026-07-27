import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import './Navbar.css'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'More', to: '/more' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-inner">
        <Link to="/" className="navbar-logo">
          PakSource <span>Connect</span>
        </Link>

        <div className="navbar-links">
          {links.map((l) => {
            const isActive = location.pathname === l.to
            return (
              <Link key={l.to} to={l.to} className={`nav-link ${isActive ? 'active' : ''}`}>
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="nav-link-indicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => navigate('/request-sourcing')} className="btn btn-primary btn-sm">
            Request Sourcing
          </button>
        </div>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="navbar-mobile-menu"
          >
            <div className="navbar-mobile-inner">
              {links.map((l) => {
                const isActive = location.pathname === l.to;
                return (
                  <Link key={l.to} to={l.to} className={`mobile-nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                    {l.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-mobile-indicator"
                        className="nav-link-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              <Link 
                to="/request-sourcing" 
                className="btn btn-primary" 
                style={{ marginTop: '0.5rem', justifyContent: 'center' }}
                onClick={() => setMenuOpen(false)}
              >
                Request Sourcing
              </Link>
              <button onClick={toggleTheme} className="mobile-theme-btn" style={{marginTop: '0.5rem', background: 'transparent', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600}}>
                {theme === 'dark' ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
