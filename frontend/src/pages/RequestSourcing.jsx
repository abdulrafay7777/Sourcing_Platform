import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, CheckCircle2, Loader2, X } from 'lucide-react'
import axios from 'axios'
import './RequestSourcing.css'

import { pageTransition } from '../utils/animations'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000'

const initialState = {
  companyName: '',
  ownerName: '',
  phone: '',
  email: '',
  city: '',
  productName: '',
  productCategory: '',
  description: '',
  specifications: '',
  quantity: '',
  targetPrice: '',
  deliveryDate: '',
}



function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  )
}

export default function RequestSourcing() {
  const [form, setForm] = useState(initialState)
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [requestId, setRequestId] = useState(null)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleFiles = (e) => {
    if (!e.target.files) return
    setFiles((prev) => [...prev, ...Array.from(e.target.files)])
  }

  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const payload = new FormData()
      payload.append('company_name', form.companyName)
      payload.append('owner_name', form.ownerName)
      payload.append('phone', form.phone)
      payload.append('email', form.email)
      payload.append('city', form.city)
      payload.append('product_name', form.productName)
      payload.append('product_category', form.productCategory)
      if (form.description) payload.append('description', form.description)
      if (form.specifications) payload.append('specifications', form.specifications)
      payload.append('quantity', form.quantity)
      if (form.targetPrice) payload.append('target_price', form.targetPrice)
      if (form.deliveryDate) payload.append('delivery_date', form.deliveryDate)
      files.forEach((f) => payload.append('files', f))

      const res = await axios.post(`${API_BASE}/api/sourcing-requests`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setRequestId(res.data.request_id)
    } catch (err) {
      setError(err?.response?.data?.detail ?? 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (requestId) {
    return (
      <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="success-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="success-icon-wrapper">
            <CheckCircle2 size={48} />
          </div>
          <h2>Thank you!</h2>
          <p>Your Product Sourcing Request has been submitted successfully.</p>
          <div className="request-id-box">{requestId}</div>
          <p className="success-note">
            Our representative will review your request and contact you shortly to discuss the next steps.
          </p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="form-page">
      <div className="form-header">
        <h1>Request Sourcing</h1>
        <p>Tell us what you're looking for and we'll get you vetted quotations from Lahore wholesalers.</p>
      </div>

      <div className="form-container glass-panel">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <Field label="Company Name">
              <input required value={form.companyName} onChange={update('companyName')} />
            </Field>
            <Field label="Owner Name">
              <input required value={form.ownerName} onChange={update('ownerName')} />
            </Field>
            <Field label="Phone Number">
              <input required value={form.phone} onChange={update('phone')} />
            </Field>
            <Field label="Email">
              <input required type="email" value={form.email} onChange={update('email')} />
            </Field>
            <Field label="City">
              <input required value={form.city} onChange={update('city')} />
            </Field>
          </div>

          <div className="form-grid">
            <Field label="Product Name">
              <input required value={form.productName} onChange={update('productName')} />
            </Field>
            <Field label="Product Category">
              <select required value={form.productCategory} onChange={update('productCategory')}>
                <option value="" disabled>Select a category...</option>
                <option value="Electronics">Electronics</option>
                <option value="Mobile Accessories">Mobile Accessories</option>
                <option value="Garments & Fashion">Garments & Fashion</option>
                <option value="Hardware">Hardware</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Plastic Products">Plastic Products</option>
                <option value="Packaging">Packaging</option>
                <option value="Stationery">Stationery</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Toys">Toys</option>
                <option value="Industrial Equipment">Industrial Equipment</option>
                <option value="Other">Other</option>
              </select>
            </Field>
          </div>

          <Field label="Product Description (Optional)">
            <textarea rows={3} value={form.description} onChange={update('description')} />
          </Field>

          <div className="form-grid">
            <Field label="Required Quantity">
              <input required value={form.quantity} onChange={update('quantity')} placeholder="e.g. 5000 units" />
            </Field>
            <Field label="Target Price (Optional)">
              <input type="number" step="0.01" value={form.targetPrice} onChange={update('targetPrice')} placeholder="PKR per unit" />
            </Field>
            <Field label="Required Delivery Date">
              <input type="date" value={form.deliveryDate} onChange={update('deliveryDate')} />
            </Field>
          </div>

          <Field label="Upload Images / Documents">
            <label className="upload-dropzone">
              <UploadCloud size={32} className="upload-dropzone-icon" />
              <span className="upload-dropzone-text">Click to upload, or drag files here</span>
              <input type="file" multiple onChange={handleFiles} accept="image/*,.pdf,.doc,.docx" />
            </label>

            <AnimatePresence>
              {files.length > 0 && (
                <div className="file-list">
                  {files.map((f, idx) => (
                    <motion.div
                      key={f.name + idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="file-chip"
                    >
                      <span>{f.name}</span>
                      <button type="button" onClick={() => removeFile(idx)}>
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </Field>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="form-error">
              {error}
            </motion.p>
          )}

          <button type="submit" disabled={submitting} className="btn btn-primary btn-submit">
            {submitting ? (
              <>
                <Loader2 size={18} className="spin" /> Submitting...
              </>
            ) : (
              'Submit Sourcing Request'
            )}
          </button>
        </form>
      </div>
    </motion.div>
  )
}
