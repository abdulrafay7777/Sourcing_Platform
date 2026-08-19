import { motion } from 'framer-motion'
import { CheckCircle2, Star, Quote, ArrowRight } from 'lucide-react'
import { fadeUp, scrollFadeUp } from '../../utils/animations'
import heroImage from '../../assets/images/hero_illustration.png'

export function WhyChooseUs() {
  return (
    <section className="section-container">
      <div className="split-section max-w-7xl mx-auto">
        <motion.div variants={scrollFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="split-text">
          <h2 className="section-title">Why Choose Us</h2>
          <h3 className="section-subtitle">We Do the Market Hunting So You Don't Have To</h3>
          <p className="section-text">
            Instead of traveling across cities searching for suppliers, simply tell us what you need. Our sourcing specialists visit wholesale markets, compare suppliers, negotiate prices, inspect products, and provide you with the best options.
          </p>
          <p className="section-text">
            Whether you're a retailer, distributor, importer, manufacturer, or e-commerce seller, we simplify your procurement process.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="split-image">
          <img src={heroImage} alt="Wholesale Sourcing" />
        </motion.div>
      </div>
    </section>
  )
}

export function OurServices({ services }) {
  return (
    <section className="section-container bg-darker">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center mb-12">Our Services</h2>
        <div className="services-grid">
          {services.map((svc, i) => (
            <motion.div 
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
  )
}

export function IndustriesWeServe({ industries }) {
  return (
    <section className="section-container">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="section-title mb-8">Industries We Serve</h2>
        <div className="industries-wrap">
          {industries.map((industry, i) => (
            <motion.span 
              key={industry}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="industry-tag"
            >
              {industry}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks({ steps }) {
  return (
    <section id="how-it-works" className="section-container bg-darker">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title text-center mb-12">How It Works</h2>
        <div className="steps-list">
          {steps.map((step, i) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
  )
}

export function TrustSection({ benefits }) {
  return (
    <section className="section-container">
      <div className="max-w-4xl mx-auto glass-panel trust-box">
        <h2 className="section-title mb-8">Why Businesses Trust Us</h2>
        <div className="trust-grid">
          {benefits.map((benefit, i) => (
            <motion.div 
              key={benefit}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
  )
}

export function TestimonialsSection({ testimonials }) {
  return (
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
              viewport={{ once: true, margin: "-100px" }}
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
  )
}

export function CTASection({ navigate }) {
  return (
    <section className="cta-section">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
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
  )
}
