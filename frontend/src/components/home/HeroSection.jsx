import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fadeUp } from '../../utils/animations'

export default function HeroSection({ scrollToHowItWorks }) {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero-background-glow" />
      <motion.div variants={fadeUp} className="hero-badge">
        B2B Sourcing, Simplified
      </motion.div>
      <motion.h1 variants={fadeUp} className="hero-title">
        Find the Right <span className="hero-title-accent">Wholesale Supplier</span> <br className="hidden sm:block" /> Without Leaving Your City
      </motion.h1>
      <motion.p variants={fadeUp} className="hero-subtitle">
        We help businesses source products directly from wholesale markets. From market research and supplier verification to price comparison and bulk procurement, we save you time, travel, and money.
      </motion.p>
      <motion.div variants={fadeUp} className="hero-actions">
        <button onClick={() => navigate('/request-sourcing')} className="btn btn-primary">
          Request Product Sourcing <ArrowRight size={18} />
        </button>
        <button onClick={scrollToHowItWorks} className="btn btn-secondary">
          Learn How It Works
        </button>
      </motion.div>
    </section>
  )
}
