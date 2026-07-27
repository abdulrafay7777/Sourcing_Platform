import { motion } from 'framer-motion'
import { Target, Lightbulb, Search } from 'lucide-react'
import { pageTransition, fadeUp } from '../utils/animations'
import './About.css'
import aboutImage from '../assets/images/about_illustration.png'

export default function About() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="about-page">
      <section className="about-header section-container">
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto text-center">
          <h1 className="section-title">About PakSource Connect</h1>
          <p className="section-subtitle">
            PakSource Connect is a B2B sourcing and procurement company helping businesses across Pakistan connect with trusted wholesale suppliers in Lahore.
          </p>
        </motion.div>
      </section>

      <section className="about-content section-container bg-darker">
        <div className="max-w-5xl mx-auto">
          <div className="about-split">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="about-split-image"
            >
              <img src={aboutImage} alt="B2B Sourcing Team" />
            </motion.div>
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="glass-panel about-intro-box">
               <h2 className="about-intro-title">Our mission is simple:</h2>
               <p className="about-intro-highlight">Make wholesale sourcing easier, faster, and more transparent.</p>
               <div className="about-intro-text">
                 <p>
                   Businesses often spend significant time and money traveling to different cities searching for suppliers, negotiating prices, and verifying product quality. <strong>We eliminate that hassle.</strong>
                 </p>
                 <p>
                   Our team visits wholesale markets on your behalf, compares suppliers, negotiates prices, inspects products when required, and provides professional sourcing reports so you can make informed purchasing decisions from anywhere in Pakistan.
                 </p>
                 <p>
                   Whether you're starting a business, expanding your inventory, or searching for a new supplier, we're here to simplify the entire sourcing process.
                 </p>
               </div>
            </motion.div>
          </div>
          
          <div className="about-grid">
            <motion.div variants={fadeUp} className="glass-panel about-card">
              <div className="about-icon-wrapper text-accent"><Target size={40} /></div>
              <h2 className="about-card-title">Our Mission</h2>
              <p className="section-text">
                To become Pakistan's most trusted B2B sourcing partner by making wholesale procurement transparent, efficient, and accessible for every business.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="glass-panel about-card">
              <div className="about-icon-wrapper text-secondary"><Lightbulb size={40} /></div>
              <h2 className="about-card-title">Our Vision</h2>
              <p className="section-text">
                To build Pakistan's largest digital sourcing network connecting businesses with verified suppliers across every major wholesale market.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
