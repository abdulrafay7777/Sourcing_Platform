export default function Field({ label, required, children }) {
  return (
    <div className="field">
      <label>
        {label}
        {required && <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>}
      </label>
      {children}
    </div>
  )
}
