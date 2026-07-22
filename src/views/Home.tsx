import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Comparison from '../components/Comparison'
import Features from '../components/Features'
import Showcase from '../components/Showcase'
import Pricing from '../components/Pricing'
import FinalCTA from '../components/FinalCTA'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Hero />
      <TrustedBy />
      <Comparison />
      <Features />
      <Showcase />
      <Pricing />
      <FinalCTA />
    </>
  )
}
