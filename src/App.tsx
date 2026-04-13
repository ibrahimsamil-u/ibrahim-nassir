/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  Star, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Instagram, 
  Facebook, 
  Twitter,
  ShieldCheck,
  Zap,
  Users,
  Heart,
  Award,
  Leaf,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Benefits', href: '#benefits' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-cream-50/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold font-serif text-brown-900 tracking-tight">NutCraft</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-brown-900/80 hover:text-amber-600 font-medium transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#pricing" className="bg-amber-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-brown-900 transition-all transform hover:scale-105 shadow-lg">
            Order Now
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-brown-900 p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-50 border-b border-brown-900/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-brown-900 py-2 border-b border-brown-900/5"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#pricing" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-amber-600 text-white px-6 py-4 rounded-xl font-bold text-lg"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PeanutButterJar = () => (
  <div className="relative w-64 h-80 mx-auto transform hover:rotate-2 transition-transform duration-500 cursor-pointer group">
    {/* Jar Body */}
    <div className="absolute inset-0 bg-amber-600/10 rounded-[40px] border-4 border-brown-900/20 backdrop-blur-sm overflow-hidden shadow-2xl">
      {/* Content (Peanut Butter) */}
      <div className="absolute bottom-0 left-0 right-0 h-[85%] bg-amber-600 rounded-t-3xl shadow-inner">
        {/* Texture/Highlights */}
        <div className="absolute top-4 left-4 w-4 h-32 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute top-10 right-6 w-2 h-20 bg-white/10 rounded-full blur-[2px]"></div>
      </div>
      
      {/* Label */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 bg-cream-50 py-6 px-2 border-y-2 border-brown-900/10 shadow-lg">
        <div className="text-center">
          <h3 className="text-brown-900 font-serif font-bold text-xl leading-none">NutCraft</h3>
          <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase mt-1">Premium Original</p>
          <div className="mt-2 flex justify-center gap-1">
            <div className="w-1 h-1 bg-brown-900 rounded-full"></div>
            <div className="w-1 h-1 bg-brown-900 rounded-full"></div>
            <div className="w-1 h-1 bg-brown-900 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Lid */}
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-[70%] h-12 bg-brown-900 rounded-xl shadow-lg z-10">
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-1 opacity-20">
        <div className="w-full h-[1px] bg-white"></div>
        <div className="w-full h-[1px] bg-white"></div>
        <div className="w-full h-[1px] bg-white"></div>
      </div>
    </div>

    {/* Floating Badge */}
    <div className="absolute -right-8 top-10 bg-forest-700 text-white text-[10px] font-bold px-3 py-3 rounded-full shadow-xl animate-bounce flex items-center justify-center text-center w-16 h-16 border-2 border-white">
      28g<br/>Protein
    </div>
  </div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
            else { h = 23; m = 59; s = 59; }
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-3 mt-8">
      <span className="text-brown-900/60 font-bold text-sm uppercase tracking-wider">Offer ends in:</span>
      <div className="flex gap-2">
        {[timeLeft.h, timeLeft.m, timeLeft.s].map((val, i) => (
          <div key={i} className="flex items-center">
            <div className="bg-brown-900 text-white w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-lg shadow-inner">
              {format(val)}
            </div>
            {i < 2 && <span className="mx-1 font-bold text-brown-900">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

const FadeInSection = ({ children, className = "" }: FadeInSectionProps) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''} ${className}`} ref={domRef}>
      {children}
    </div>
  );
};

interface AccordionItemProps {
  question: string;
  answer: string;
  key?: React.Key;
}

const AccordionItem = ({ question, answer }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brown-900/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-lg font-bold text-brown-900 group-hover:text-amber-600 transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="text-amber-600" /> : <ChevronDown className="text-brown-900/40" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-brown-900/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#D4860A15_0%,transparent_50%)] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="inline-flex items-center gap-2 bg-amber-600/10 text-amber-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Zap size={16} />
                <span>Limited Small-Batch Release</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-extrabold text-brown-900 leading-[1.1] mb-6">
                Crafted for the Bold. <br/>
                <span className="text-amber-600">Fueled by Pure Protein.</span>
              </h1>
              <p className="text-xl text-brown-900/70 mb-10 max-w-lg leading-relaxed">
                No junk. No compromise. Just real peanut butter the way nature intended. Small-batch roasted for the ultimate flavor profile.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="#pricing" className="bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brown-900 transition-all shadow-xl text-center">
                  Shop Now — Get 20% Off Today
                </a>
                <a href="#ingredients" className="bg-white border-2 border-brown-900/10 text-brown-900 px-8 py-4 rounded-full font-bold text-lg hover:border-amber-600 transition-all text-center">
                  See What's Inside
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { label: "Non-GMO", icon: <ShieldCheck size={18}/> },
                  { label: "Gluten-Free", icon: <Leaf size={18}/> },
                  { label: "No Added Sugar", icon: <Heart size={18}/> },
                  { label: "28g Protein", icon: <Zap size={18}/> }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-brown-900/60 uppercase tracking-wider">
                    <span className="text-amber-600">{badge.icon}</span>
                    {badge.label}
                  </div>
                ))}
              </div>

              <CountdownTimer />
            </FadeInSection>

            <FadeInSection className="relative">
              <div className="absolute inset-0 bg-amber-600/5 rounded-full blur-3xl -z-10 transform scale-150"></div>
              <PeanutButterJar />
              <div className="mt-12 text-center">
                <p className="text-brown-900/40 text-sm font-medium italic">"The best texture I've ever had in a natural PB."</p>
                <p className="text-brown-900 font-bold text-sm mt-1">— Marcus T., Pro Athlete</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </header>

      {/* Social Proof Bar */}
      <section className="bg-brown-900 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-brown-900 bg-amber-600 flex items-center justify-center text-white font-bold text-xs">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-white/80 text-sm font-medium">
              <span className="text-white font-bold block">Trusted by 50,000+</span>
              happy customers
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={20} fill="#D4860A" className="text-amber-600" />
              ))}
            </div>
            <div className="text-white font-bold text-lg">
              4.9/5 <span className="text-white/40 font-normal text-sm ml-1">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brown-900 mb-4">Why NutCraft Wins Every Time</h2>
            <p className="text-brown-900/60 max-w-2xl mx-auto">We didn't just make peanut butter. We perfected the fuel your body deserves with zero compromises on taste or quality.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "High Protein", desc: "28g of pure plant-based protein per serving to fuel your gains.", icon: <Zap /> },
              { title: "Zero Junk", desc: "No palm oil, no preservatives, and absolutely no hidden sugars.", icon: <ShieldCheck /> },
              { title: "Small-Batch Quality", desc: "Roasted in limited quantities to ensure perfect flavor every time.", icon: <Award /> },
              { title: "Great Taste", desc: "Deep, rich roasted flavor that puts commercial brands to shame.", icon: <Heart /> },
              { title: "Family Safe", desc: "Clean ingredients you can trust for your kids' lunchboxes.", icon: <Users /> },
              { title: "Athlete Approved", desc: "The preferred choice for high-performance athletes and trainers.", icon: <Award /> }
            ].map((benefit, i) => (
              <FadeInSection key={i} className="p-8 rounded-3xl bg-cream-50 border border-brown-900/5 hover:border-amber-600/30 transition-all hover:shadow-xl group">
                <div className="w-14 h-14 bg-amber-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-brown-900 mb-3">{benefit.title}</h3>
                <p className="text-brown-900/60 leading-relaxed">{benefit.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section id="ingredients" className="py-24 bg-cream-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brown-900 mb-8">Only 3 Ingredients. Seriously.</h2>
              <div className="space-y-6 mb-12">
                {[
                  { name: "Dry Roasted Peanuts", desc: "Premium runner peanuts, roasted to a deep amber." },
                  { name: "Sea Salt", desc: "Just a pinch to enhance the natural nuttiness." },
                  { name: "Love", desc: "And maybe a touch of organic coconut oil for texture." }
                ].map((ing, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-forest-700 text-white rounded-full p-1">
                      <Check size={16} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brown-900">{ing.name}</h4>
                      <p className="text-brown-900/60">{ing.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl border border-brown-900/5">
                <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck className="text-forest-700" />
                  Nutritional Superiority
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-brown-900/10">
                        <th className="pb-4 font-bold text-sm text-brown-900/40 uppercase">Feature</th>
                        <th className="pb-4 font-bold text-sm text-amber-600 uppercase">NutCraft</th>
                        <th className="pb-4 font-bold text-sm text-brown-900/40 uppercase">Others</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { f: "Added Sugar", n: "0g", o: "8g+" },
                        { f: "Palm Oil", n: "None", o: "Yes" },
                        { f: "Art. Flavors", n: "None", o: "Yes" },
                        { f: "Protein/Serv", n: "28g", o: "18g" }
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-brown-900/5 last:border-0">
                          <td className="py-4 font-medium text-brown-900">{row.f}</td>
                          <td className="py-4 font-bold text-forest-700">{row.n}</td>
                          <td className="py-4 text-brown-900/40">{row.o}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection className="relative flex justify-center">
              <div className="w-full max-w-md aspect-square bg-brown-900 rounded-[60px] p-12 flex flex-col justify-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-forest-700/20 rounded-full blur-3xl"></div>
                <h3 className="text-3xl font-serif font-bold mb-6">The NutCraft Promise</h3>
                <p className="text-white/70 leading-relaxed mb-8">We believe that what you put in your body matters. That's why we never use fillers, hydrogenated oils, or artificial sweeteners. Just pure, unadulterated energy.</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                    <ShieldCheck />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Certified Non-GMO</p>
                    <p className="text-white/40 text-xs">Verified by CleanLabel Project</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* How It's Made */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brown-900 mb-4">From Farm to Jar</h2>
            <p className="text-brown-900/60">Our meticulous 3-step process ensures every spoonful is perfection.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-brown-900/10 -translate-y-1/2 -z-10"></div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Premium Sourcing", desc: "We source only the finest runner peanuts from sustainable family farms." },
                { step: "02", title: "Small-Batch Roasting", desc: "Peanuts are slow-roasted in small batches to unlock deep, complex flavors." },
                { step: "03", title: "Fresh Sealing", desc: "Ground and sealed immediately to lock in that signature fresh-roasted aroma." }
              ].map((item, i) => (
                <FadeInSection key={i} className="text-center bg-white p-8">
                  <div className="w-20 h-20 bg-brown-900 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-2xl font-bold border-8 border-cream-50 shadow-xl">
                    {item.step}
                  </div>
                  <h4 className="text-2xl font-bold text-brown-900 mb-4">{item.title}</h4>
                  <p className="text-brown-900/60 leading-relaxed">{item.desc}</p>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brown-900 mb-4">Real People. Real Results.</h2>
              <p className="text-brown-900/60">Join 50,000+ others who have upgraded their pantry.</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-brown-900/5 flex items-center gap-4">
              <div className="text-right">
                <div className="flex gap-1 justify-end mb-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#D4860A" className="text-amber-600" />)}
                </div>
                <p className="text-xs font-bold text-brown-900">4.9 out of 5 stars</p>
              </div>
              <div className="h-10 w-[1px] bg-brown-900/10"></div>
              <p className="text-xs text-brown-900/60 font-medium">Based on 3,847 reviews</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", loc: "Austin, TX", text: "As a marathon runner, I've tried every PB out there. NutCraft is the only one that doesn't give me a sugar crash and actually tastes like real peanuts.", initial: "S" },
              { name: "David M.", loc: "Chicago, IL", text: "My kids are obsessed. I feel so much better knowing they're eating something with zero palm oil and high protein. The 3-pack is a lifesaver.", initial: "D" },
              { name: "Elena R.", loc: "Miami, FL", text: "The texture is incredible. It's perfectly creamy but has that authentic roasted bite. Worth every penny for the quality you get.", initial: "E" }
            ].map((rev, i) => (
              <FadeInSection key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-brown-900/5 relative">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#D4860A" className="text-amber-600" />)}
                </div>
                <p className="text-brown-900/80 italic mb-8 leading-relaxed">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-600/10 text-amber-600 rounded-full flex items-center justify-center font-bold">
                    {rev.initial}
                  </div>
                  <div>
                    <p className="font-bold text-brown-900">{rev.name}</p>
                    <p className="text-xs text-brown-900/40 uppercase tracking-widest">{rev.loc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brown-900 mb-4">Pick Your Pack. Save More.</h2>
            <p className="text-brown-900/60">Free shipping on all orders over $35.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <FadeInSection className="p-8 rounded-[40px] border-2 border-brown-900/5 bg-cream-50">
              <h3 className="text-2xl font-bold text-brown-900 mb-2">Starter Pack</h3>
              <p className="text-brown-900/40 text-sm mb-6">Perfect for a taste test</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-brown-900">$14.99</span>
                <span className="text-brown-900/40 ml-2">/ jar</span>
              </div>
              <ul className="space-y-4 mb-10">
                {["1x 16oz Jar", "Premium Original", "Small-Batch Roasted"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-brown-900/70">
                    <Check size={16} className="text-forest-700" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl border-2 border-brown-900 text-brown-900 font-bold hover:bg-brown-900 hover:text-white transition-all">
                Add to Cart
              </button>
            </FadeInSection>

            {/* Most Popular */}
            <FadeInSection className="p-10 rounded-[40px] bg-brown-900 text-white relative shadow-2xl transform lg:scale-110 z-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">The Fuel Pack</h3>
              <p className="text-white/40 text-sm mb-6">Best value for athletes</p>
              <div className="mb-8">
                <span className="text-5xl font-bold">$39.99</span>
                <div className="inline-block bg-forest-700 text-[10px] px-2 py-1 rounded ml-2 align-top">SAVE $5</div>
              </div>
              <ul className="space-y-4 mb-10">
                {["3x 16oz Jars", "Free Recipe E-Book", "Free Shipping", "Priority Dispatch"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                    <Check size={16} className="text-amber-600" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 rounded-2xl bg-amber-600 text-white font-bold text-lg hover:bg-white hover:text-brown-900 transition-all shadow-xl">
                Add to Cart
              </button>
            </FadeInSection>

            {/* Family Pack */}
            <FadeInSection className="p-8 rounded-[40px] border-2 border-brown-900/5 bg-cream-50">
              <h3 className="text-2xl font-bold text-brown-900 mb-2">Family Pack</h3>
              <p className="text-brown-900/40 text-sm mb-6">Stock up and save big</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-brown-900">$74.99</span>
                <div className="inline-block bg-forest-700 text-[10px] px-2 py-1 rounded ml-2 align-top text-white">SAVE $15</div>
              </div>
              <ul className="space-y-4 mb-10">
                {["6x 16oz Jars", "Free Recipe E-Book", "Free Shipping", "Lifetime Discount"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-brown-900/70">
                    <Check size={16} className="text-forest-700" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl border-2 border-brown-900 text-brown-900 font-bold hover:bg-brown-900 hover:text-white transition-all">
                Add to Cart
              </button>
            </FadeInSection>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <div className="flex items-center gap-3 bg-forest-700/5 px-6 py-3 rounded-full border border-forest-700/10">
              <ShieldCheck className="text-forest-700" />
              <span className="text-sm font-bold text-forest-700 uppercase tracking-wider">30-Day No-Risk Guarantee</span>
            </div>
            <p className="text-brown-900/40 text-xs mt-4 max-w-md text-center">If you don't think it's the best peanut butter you've ever tasted, we'll refund your entire order. No questions asked.</p>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-24 bg-amber-600 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeInSection>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">Get 20% Off Your First Order</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Plus free recipes, fitness tips, and exclusive subscriber deals delivered straight to your inbox.</p>
            
            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white px-6 py-4 rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-brown-900/20 shadow-xl"
                />
                <button type="submit" className="bg-brown-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl">
                  Claim My Discount
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-3xl shadow-2xl inline-block"
              >
                <div className="w-16 h-16 bg-forest-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brown-900 mb-2">Check Your Inbox!</h3>
                <p className="text-brown-900/60 font-medium">Your 20% discount code is on its way.</p>
              </motion.div>
            )}
            <p className="text-white/60 text-xs mt-6">We respect your privacy. Unsubscribe at any time.</p>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brown-900 mb-4">Got Questions? We've Got Answers.</h2>
          </div>

          <div className="bg-cream-50 rounded-[40px] p-8 md:p-12 border border-brown-900/5">
            {[
              { q: "Is it really all natural?", a: "Yes! We use 100% natural ingredients. No artificial preservatives, colors, or stabilizers. Just peanuts, a touch of sea salt, and love." },
              { q: "Does it need refrigeration?", a: "While not strictly necessary, we recommend refrigerating after opening to maintain optimal freshness and prevent natural oil separation over long periods." },
              { q: "Is it safe for kids?", a: "Absolutely. NutCraft is a clean, high-protein snack that's perfect for growing kids. Just be mindful of peanut allergies!" },
              { q: "How much protein per serving?", a: "Each 2-tablespoon serving contains a massive 28g of pure plant-based protein, making it one of the most protein-dense PBs on the market." },
              { q: "What's your return policy?", a: "We offer a 30-day no-risk guarantee. If you're not satisfied, we'll refund your order in full." },
              { q: "Do you ship internationally?", a: "Currently, we ship to the US, Canada, and the UK. We're working hard to bring NutCraft to more countries soon!" }
            ].map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brown-900 pt-20 pb-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <span className="text-3xl font-bold font-serif tracking-tight mb-4 block">NutCraft</span>
              <p className="text-white/60 max-w-sm leading-relaxed mb-8">
                Crafted for the Bold. Fueled by Pure Protein. We're on a mission to provide the cleanest, most delicious fuel for your active lifestyle.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-amber-600">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#ingredients" className="hover:text-white transition-colors">Ingredients</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-amber-600">Support</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-medium">
            <p>© 2026 NutCraft Premium Foods. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Made with Love & Peanuts</span>
              <span>Small-Batch Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
