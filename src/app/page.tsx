
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SecondHero from '@/components/SecondHero';
import Services from '@/components/Services';
import About from '@/components/About';
import FunFacts from '@/components/FunFacts';
import Partners from '@/components/Partners';
import Newsletter from '@/components/Newsletter';
import Portfolio from '@/components/portfolio/Portfolio';
import Pricing from '@/components/pricing/Pricing';
import Testimonials from '@/components/Testimonials';
import Team from '@/components/Team';
import Blog from '@/components/blog/Blog';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">

      <Hero />
      <Services />
      <About />
      <FunFacts />
      <Portfolio />
      <Partners />
      <Pricing />
      <SecondHero />
      <Testimonials />
      <Team />
      <Blog />
      <Newsletter />

    </div>
  );
}
