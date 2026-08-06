import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { pageTransition } from '../utils/animations'
import HeroSection from '../components/home/HeroSection'
import { 
  WhyChooseUs, 
  OurServices, 
  IndustriesWeServe, 
  HowItWorks, 
  TrustSection, 
  TestimonialsSection, 
  CTASection 
} from '../components/home/HomeSections'
import { services, industries, steps, benefits, testimonials } from '../utils/homeData'

export default function Home() {
  const navigate = useNavigate()

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      
      <HeroSection scrollToHowItWorks={scrollToHowItWorks} />
      
      <WhyChooseUs />
      
      <OurServices services={services} />
      
      <IndustriesWeServe industries={industries} />
      
      <HowItWorks steps={steps} />
      
      <TrustSection benefits={benefits} />
      
      <TestimonialsSection testimonials={testimonials} />
      
      <CTASection navigate={navigate} />

    </motion.div>
  )
}
