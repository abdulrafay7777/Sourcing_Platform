import { motion } from 'framer-motion'
import { Target, Lightbulb, ShieldCheck, Users, UserCheck, Tag, Truck, Headset } from 'lucide-react'
import { pageTransition, fadeUp } from '../utils/animations'
import './About.css'
import aboutImage from '../assets/images/about_illustration.png'

const FEATURES = [
  { icon: UserCheck, title: 'Verified Suppliers', description: 'We connect you with trusted and reliable suppliers only.' },
  { icon: Tag, title: 'Best Market Rates', description: 'We negotiate the best possible rates to maximize your profit.' },
  { icon: ShieldCheck, title: 'Quality Assurance', description: 'Every product is checked for quality and authenticity.' },
  { icon: Truck, title: 'Nationwide Reach', description: 'We source from across the country to meet your business needs.' },
  { icon: Headset, title: 'End-to-End Support', description: 'From product search to delivery — we\'re with you at every step.' }
];

export default function About() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="about-page">
      <section className="about-header section-container">
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto text-center">
          <h1 className="section-title">About PakSource Connect</h1>
          <p className="section-subtitle">
            PakSource Connect is a premier B2B sourcing and procurement agency. We bridge the gap between businesses across Pakistan and trusted, verified wholesale suppliers in Lahore's bustling markets.
          </p>
        </motion.div>
      </section>

      <section className="about-content section-container bg-darker" style={{ borderBottom: 'none' }}>
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
                   Our team acts as your dedicated on-ground procurement arm. We visit wholesale markets on your behalf, compare multiple suppliers, negotiate the best prices, inspect products to ensure quality standards, and provide professional sourcing reports so you can make informed purchasing decisions from anywhere in Pakistan.
                 </p>
                 <p>
                   Whether you're starting a new business venture, expanding your existing inventory, or simply searching for a more reliable supplier, we're here to streamline the entire sourcing process from initial inquiry to final delivery.
                 </p>
               </div>
            </motion.div>
          </div>
          
          <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="stats-banner">
            <div className="stats-item">
              <div className="stats-number">500+</div>
              <div className="stats-label">Verified Suppliers</div>
            </div>
            <div className="stats-item">
              <div className="stats-number">10k+</div>
              <div className="stats-label">Products Sourced</div>
            </div>
            <div className="stats-item">
              <div className="stats-number">98%</div>
              <div className="stats-label">Client Satisfaction</div>
            </div>
          </motion.div>

          <div className="about-grid">
            <motion.div variants={fadeUp} className="glass-panel about-card">
              <div className="about-icon-wrapper text-accent"><Target size={40} /></div>
              <h2 className="about-card-title">Our Mission</h2>
              <p className="section-text">
                To become Pakistan's most trusted B2B sourcing partner by making wholesale procurement transparent, efficient, and accessible for every business, regardless of their size or location.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="glass-panel about-card">
              <div className="about-icon-wrapper text-secondary"><Lightbulb size={40} /></div>
              <h2 className="about-card-title">Our Vision</h2>
              <p className="section-text">
                To build Pakistan's largest digital sourcing network, seamlessly connecting retail businesses and entrepreneurs with verified, high-quality suppliers across every major wholesale market.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-panel about-card">
              <div className="about-icon-wrapper text-accent"><ShieldCheck size={40} /></div>
              <h2 className="about-card-title">Our Promise</h2>
              <p className="section-text">
                We guarantee complete transparency in pricing, uncompromising quality control, and secure transactions, ensuring your peace of mind throughout the procurement journey.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="glass-panel about-card">
              <div className="about-icon-wrapper text-secondary"><Users size={40} /></div>
              <h2 className="about-card-title">Why Choose Us</h2>
              <p className="section-text">
                With deep local market knowledge, an extensive supplier network, and a commitment to your success, we are more than just a sourcing agency - we are your strategic growth partner.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted Sourcing Section from Mockup */}
      <section className="section-container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="trusted-title">
            Trusted Sourcing. Better Connections.
          </h1>
          <p className="trusted-subtitle">
            We work behind the scenes to connect your business with verified suppliers<br className="hidden md:block" />
            across Pakistan. Our strong industry network and local expertise help you get<br className="hidden md:block" />
            the right products at the right prices — every time.
          </p>
 
          <div className="trusted-features-grid">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="trusted-card">
                <div className="trusted-icon">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="trusted-card-title">{title}</h3>
                <p className="trusted-card-desc">{description}</p>
              </div>
            ))}
          </div>
 
          <p className="trusted-footer-text">
            Focus on growing your business. We'll handle the sourcing.
          </p>
        </div>
      </section>

    </motion.div>
  )
}
