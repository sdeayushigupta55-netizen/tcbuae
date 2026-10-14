import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { ScrollTop } from './components/ui/ScrollTop';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Licenses } from './pages/Licenses';
import { NotFound } from './pages/NotFound';
import { ServiceDetail } from './pages/ServiceDetail';
import { Services } from './pages/Services';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/licenses" element={<Licenses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <AnimatedRoutes />
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  );
}
