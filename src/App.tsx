import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Highlights from '@/components/Highlights';
import Competitions from '@/components/Competitions';
import Speakers from '@/components/Speakers';
import Exhibitions from '@/components/Exhibitions';
import Workshops from '@/components/Workshops';
import Sponsors from '@/components/Sponsors';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-ink-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Highlights />
        <Competitions />
        <Speakers />
        <Exhibitions />
        <Workshops />
        <Sponsors />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
