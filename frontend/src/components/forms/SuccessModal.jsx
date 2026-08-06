import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessModal({ trackingId, onDone }) {
  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="success-modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      >
        <div className="success-icon-wrapper">
          <CheckCircle2 size={36} />
        </div>
        
        <h2>Request Received</h2>
        
        <p>
          Thank you for choosing us. Our team will review your sourcing request and contact you shortly.
        </p>
        
        <div className="tracking-id-container">
          <span className="tracking-label">Tracking ID</span>
          <div className="request-id-box">{trackingId}</div>
        </div>
        
        <button 
          className="btn-done"
          onClick={onDone}
        >
          Done
        </button>
      </motion.div>
    </motion.div>
  )
}
