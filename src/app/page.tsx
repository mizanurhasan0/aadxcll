
import Hero from '@/components/Hero';
// import SecondHero from '@/components/SecondHero';
import About from '@/components/About';
import FunFacts from '@/components/FunFacts';
import Partners from '@/components/Partners';
import Services from '@/components/Services';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/blog/Blog';
import Portfolio from '@/components/portfolio/Portfolio';
import Pricing from '@/components/pricing/Pricing';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <FunFacts />
      <Portfolio limit={5} />
      <Partners />
      <Pricing />
      {/* <SecondHero /> */}
      <Testimonials />
      <Team />
      <Blog />
    </div>
  );
}
