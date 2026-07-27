import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, PackageSearch } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer bg-darker">
      <div className="max-w-7xl mx-auto footer-grid">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <PackageSearch className="text-accent" size={28} />
            PakSource Connect
          </Link>
          <p className="footer-text">
            Making wholesale sourcing simple, transparent, and efficient for businesses across Pakistan.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/request-sourcing">Request Sourcing</Link></li>
            <li><Link to="/more">Contact & FAQ</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4 className="footer-heading">Contact Us</h4>
          <ul>
            <li>
              <Phone size={18} className="text-muted" />
              <span>+92 3395186263</span>
            </li>
            <li>
              <Mail size={18} className="text-muted" />
              <span>info@paksourceconnect.com</span>
            </li>
            <li>
              <MapPin size={18} className="text-muted" />
              <span>Lahore, Punjab, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PakSource Connect. All rights reserved.</p>
      </div>
    </footer>
  )
}
