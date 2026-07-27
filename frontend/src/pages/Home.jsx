import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, FileSearch, ShieldCheck, Truck, Handshake, 
  DollarSign, Package, CheckCircle2, Factory, ChevronRight,
  Star, Quote
} from 'lucide-react'
import './Home.css'
import { pageTransition, fadeUp } from '../utils/animations'
import heroImage from '../assets/images/hero_illustration.png'

const services = [
  { icon: FileSearch, title: 'Product Sourcing', desc: 'We locate reliable wholesale suppliers based on your product requirements.' },
  { icon: DollarSign, title: 'Price Comparison', desc: 'Receive quotations from multiple suppliers to make informed purchasing decisions.' },
  { icon: ShieldCheck, title: 'Supplier Verification', desc: 'We work only with verified suppliers to reduce business risk.' },
  { icon: Package, title: 'Sample Procurement', desc: 'Need to inspect quality first? We arrange product samples before bulk purchasing.' },
  { icon: Truck, title: 'Bulk Procurement Assistance', desc: 'Once you approve a supplier, we help coordinate your bulk order.' },
  { icon: Factory, title: 'Market Research', desc: 'Need a new product? We\'ll research the market before you invest.' },
]

const industries = [
  'Electronics', 'Mobile Accessories', 'Garments & Fashion', 'Hardware',
  'Home & Kitchen', 'Plastic Products', 'Packaging', 'Stationery',
  'Cosmetics', 'Toys', 'Industrial Equipment', 'And many more...'
]

const steps = [
  { title: 'Submit your sourcing request' },
  { title: 'Pay the sourcing fee' },
  { title: 'We search Lahore\'s wholesale markets' },
  { title: 'Receive supplier comparison, prices, photos, and recommendations' },
  { title: 'Approve your preferred supplier' },
  { title: 'Place your bulk order' },
]

const benefits = [
  'Save travel expenses',
  'Save valuable business time',
  'Access multiple suppliers with one request',
  'Transparent price comparison',
  'Quality inspection available',
  'Reliable communication',
  'Professional procurement support'
]

const testimonials = [
  {
    quote: "PakSource completely eliminated the hassle of traveling to Lahore to find suppliers. They found a much better rate for our packaging materials.",
    author: "Ahmed ",
    company: "Retail Store Owner"
  },
  {
    quote: "We needed industrial hardware in bulk. Not only did they find the right supplier, but their verification process gave us total peace of mind.",
    author: "Zainab Ali",
    company: "Manufacturing Firm"
  },
  {
    quote: "Exceptional service. They procured samples for us within days and helped negotiate a fantastic deal for our new electronics line.",
    author: "Faisal",
    company: "E-commerce Seller"
  }
]

export default function Home() {
  const navigate = useNavigate()

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      
      {/* Hero Section */}
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

      {/* Why Choose Us */}
      <section className="section-container">
        <div className="split-section max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="split-text">
            <h2 className="section-title">Why Choose Us</h2>
            <h3 className="section-subtitle">We Do the Market Hunting So You Don't Have To</h3>
            <p className="section-text">
              Instead of traveling across cities searching for suppliers, simply tell us what you need. Our sourcing specialists visit wholesale markets, compare suppliers, negotiate prices, inspect products, and provide you with the best options.
            </p>
            <p className="section-text">
              Whether you're a retailer, distributor, importer, manufacturer, or e-commerce seller, we simplify your procurement process.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="split-image">
            <img src={heroImage} alt="Wholesale Sourcing" />
          </motion.div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-container bg-darker">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-12">Our Services</h2>
          <div className="services-grid">
            {services.map((svc, i) => (
              <motion.div 
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="service-card glass-panel"
              >
                <div className="service-icon-wrapper"><svc.icon size={24} /></div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-container">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-title mb-8">Industries We Serve</h2>
          <div className="industries-wrap">
            {industries.map((industry, i) => (
              <motion.span 
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="industry-tag"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-container bg-darker">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center mb-12">How It Works</h2>
          <div className="steps-list">
            {steps.map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="step-item glass-panel"
              >
                <div className="step-number">Step {i + 1}</div>
                <div className="step-content">
                  <h4 className="step-content-title">{step.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Businesses Trust Us */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto glass-panel trust-box">
          <h2 className="section-title mb-8">Why Businesses Trust Us</h2>
          <div className="trust-grid">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="trust-item"
              >
                <CheckCircle2 size={20} className="trust-icon" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-container bg-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Client Success Stories</h2>
            <p className="section-subtitle">Hear from businesses we've helped scale</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="testimonial-card glass-panel"
              >
                <div className="testimonial-stars">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <Quote className="testimonial-quote-icon" size={32} />
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author-box">
                  <div className="testimonial-avatar">{testimonial.author.charAt(0)}</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-author">{testimonial.author}</h4>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="cta-box glass-panel"
        >
          <h2 className="cta-title">Ready to Source Your Next Product?</h2>
          <p className="cta-text">
            Stop traveling from market to market. Let our sourcing experts find the right supplier for you.
          </p>
          <button onClick={() => navigate('/request-sourcing')} className="btn btn-primary cta-btn">
            Request Sourcing Now <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>

    </motion.div>
  )
}
