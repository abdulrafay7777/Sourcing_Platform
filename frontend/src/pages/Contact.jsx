import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { pageTransition, fadeUp } from '../utils/animations'
import './Contact.css'

const faqs = [
  { question: 'Do you sell products?', answer: 'No. We provide sourcing and procurement services.' },
  { question: 'Which cities do you serve?', answer: 'Businesses from anywhere in Pakistan.' },
  { question: 'Do you source every type of product?', answer: 'Yes, provided the product is available in Pakistan\'s wholesale markets.' },
  { question: 'Can I request product samples?', answer: 'Yes.' },
  { question: 'How long does sourcing take?', answer: 'Depends on the product.' },
  { question: 'Do you guarantee the lowest price?', answer: 'We compare multiple suppliers to help you obtain competitive market pricing.' },
]

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-accent" /> : <ChevronDown size={20} className="text-muted" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="faq-answer-container"
          >
            <div className="faq-answer">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="contact-page">
      
      {/* Header */}
      <section className="section-container pb-0">
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto text-center">
          <h1 className="section-title">Contact Us</h1>
          <h3 className="section-subtitle mb-4">Let's Find the Right Supplier for Your Business</h3>
          <p className="section-text max-w-3xl mx-auto">
            Whether you're looking for a new wholesale supplier, need product sourcing assistance, or have questions about our services, our team is ready to help.
            At PakSource Connect, we're committed to making wholesale sourcing simple, transparent, and efficient for businesses across Pakistan.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Grid */}
      <section className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="contact-grid">
            
            <motion.div variants={fadeUp} className="contact-card glass-panel">
              <div className="contact-icon-wrapper"><Phone size={24} /></div>
              <h4 className="contact-card-title">Phone</h4>
              <p className="contact-card-text">+92 313 8385059</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="contact-card glass-panel">
              <div className="contact-icon-wrapper" style={{ color: '#25D366' }}><FaWhatsapp size={24} /></div>
              <h4 className="contact-card-title">WhatsApp</h4>
              <p className="contact-card-text">+92 313 8385059</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="contact-card glass-panel">
              <div className="contact-icon-wrapper text-accent"><Mail size={24} /></div>
              <h4 className="contact-card-title">Email</h4>
              <p className="contact-card-text">contact@paksourceconnect.com</p>
            </motion.div>

            <motion.div variants={fadeUp} className="contact-card glass-panel">
              <div className="contact-icon-wrapper text-secondary"><MapPin size={24} /></div>
              <h4 className="contact-card-title">Office Location</h4>
              <p className="contact-card-text">Lahore, Punjab, Pakistan</p>
            </motion.div>

            <motion.div variants={fadeUp} className="contact-card glass-panel md:col-span-2 lg:col-span-1">
              <div className="contact-icon-wrapper text-accent"><Clock size={24} /></div>
              <h4 className="contact-card-title">Business Hours</h4>
              <p className="contact-card-text">Monday – Sunday</p>
              <p className="contact-card-subtext mt-2">Our support team is available 24/7 to assist you.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container bg-darker">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <motion.div 
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  )
}
