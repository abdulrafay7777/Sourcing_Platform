import { motion } from 'framer-motion'
import './Placeholder.css'

import { pageTransition } from '../utils/animations'

export default function Placeholder({ title, blurb }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="placeholder-page">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1>{title}</h1>
        <p>{blurb}</p>
      </motion.div>
    </motion.div>
  )
}
