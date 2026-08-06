import { motion } from 'framer-motion'
import { 
  Search, BarChart2, ShieldCheck, Box, Handshake, TrendingUp, 
  FileText, MessageSquare, MapPin, ListChecks, CheckCircle, Package 
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { pageTransition, fadeUp } from '../utils/animations'
import './Services.css'
import servicesImage from '../assets/images/services_illustration.png'

const services = [
  { icon: Search, title: 'Product Sourcing', desc: 'We locate suppliers based on your exact product requirements.' },
  { icon: BarChart2, title: 'Supplier Comparison', desc: 'Receive multiple quotations with pricing, MOQ, product quality, and delivery information.' },
  { icon: ShieldCheck, title: 'Supplier Verification', desc: 'Reduce procurement risks by working with verified suppliers.' },
  { icon: Box, title: 'Sample Collection', desc: 'We arrange product samples before you invest in bulk.' },
  { icon: Handshake, title: 'Procurement Assistance', desc: 'From supplier selection to final purchase, we assist throughout the process.' },
  { icon: TrendingUp, title: 'Market Research', desc: 'Looking for a new product? We\'ll analyze market demand, supplier availability, pricing, and competition.' },
]

const processSteps = [
  { icon: FileText, title: 'Submit Your Request', desc: 'Complete our sourcing request form.' },
  { icon: MessageSquare, title: 'Initial Consultation', desc: 'We review your requirements and confirm project details.' },
  { icon: MapPin, title: 'Market Research', desc: 'Our sourcing team visits Lahore\'s wholesale markets.' },
  { icon: ListChecks, title: 'Supplier Comparison', desc: 'You\'ll receive:\n• Prices\n• Product photos\n• MOQ\n• Lead time\n• Recommendations' },
  { icon: CheckCircle, title: 'Approval', desc: 'Choose your preferred supplier.' },
  { icon: Package, title: 'Bulk Order', desc: 'We coordinate the procurement process.' },
]

export default function Services() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="services-page">
      
      {/* Header */}
      <section className="services-header section-container">
        <div className="split-section max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="initial" animate="animate" className="split-text">
            <h1 className="section-title">Our Services</h1>
            <p className="section-subtitle">Comprehensive B2B Sourcing Solutions</p>
            <p className="section-text">
              From sourcing a single product to managing full procurement cycles, we offer a complete suite of services to connect your business with trusted Lahore wholesalers.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/request-sourcing" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>
                Book Our Service
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="split-image"
          >
            <img src={servicesImage} alt="Sourcing Process Illustration" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container bg-darker pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="services-grid">
            {services.map((svc, i) => (
              <motion.div 
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="service-card glass-panel"
              >
                <div className="service-icon-wrapper"><svc.icon size={28} /></div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Timeline) */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} className="text-center mb-12">
            <h2 className="section-title">How It Works</h2>
            <p className="section-text">A transparent and streamlined process from start to finish.</p>
          </motion.div>

          <div className="timeline-container">
            {processSteps.map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="timeline-item"
              >
                <div className="timeline-marker">
                  <div className="timeline-icon"><step.icon size={20} /></div>
                  {i !== processSteps.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-content glass-panel">
                  <h4 className="timeline-title">{step.title}</h4>
                  <div className="timeline-desc">
                    {step.desc.split('\n').map((line, idx) => (
                      <p key={idx} className={line.startsWith('•') ? 'timeline-bullet' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  )
}
