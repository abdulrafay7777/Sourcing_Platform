import { FileSearch, ShieldCheck, Truck, DollarSign, Package, Factory } from 'lucide-react'

export const services = [
  { icon: FileSearch, title: 'Product Sourcing', desc: 'We locate reliable wholesale suppliers based on your product requirements.' },
  { icon: DollarSign, title: 'Price Comparison', desc: 'Receive quotations from multiple suppliers to make informed purchasing decisions.' },
  { icon: ShieldCheck, title: 'Supplier Verification', desc: 'We work only with verified suppliers to reduce business risk.' },
  { icon: Package, title: 'Sample Procurement', desc: 'Need to inspect quality first? We arrange product samples before bulk purchasing.' },
  { icon: Truck, title: 'Bulk Procurement Assistance', desc: 'Once you approve a supplier, we help coordinate your bulk order.' },
  { icon: Factory, title: 'Market Research', desc: 'Need a new product? We\'ll research the market before you invest.' },
]

export const industries = [
  'Electronics', 'Mobile Accessories', 'Garments & Fashion', 'Hardware',
  'Home & Kitchen', 'Plastic Products', 'Packaging', 'Stationery',
  'Cosmetics', 'Toys', 'Industrial Equipment', 'And many more...'
]

export const steps = [
  { title: 'Submit your sourcing request' },
  { title: 'Pay the sourcing fee' },
  { title: 'We search Lahore\'s wholesale markets' },
  { title: 'Receive supplier comparison, prices, photos, and recommendations' },
  { title: 'Approve your preferred supplier' },
  { title: 'Place your bulk order' },
]

export const benefits = [
  'Save travel expenses',
  'Save valuable business time',
  'Access multiple suppliers with one request',
  'Transparent price comparison',
  'Quality inspection available',
  'Reliable communication',
  'Professional procurement support'
]

export const testimonials = [
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
