import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import './FloatingWhatsApp.css'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/923138385059"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <FaWhatsapp size={32} />
    </motion.a>
  )
}
