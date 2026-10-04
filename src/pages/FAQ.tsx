import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const DISCORD = "https://discord.gg/8HpRpHsHVT";

const faqs = [
  {
    question: "Who are we?",
    answer:
      "Tactical Development & Evaluations Group is a Naval Special Warfare Development Group–styled Arma 3 milsim unit. We focus on advanced tactics development, evaluation of TTPs, and execution of high-end special operations in a DEVGRU/NSW framework.",
  },
  {
    question: "What is our mission set?",
    answer: (
      <ul className="space-y-2">
        <li>• Direct Action (DA)</li>
        <li>• Hostage Rescue (HR)</li>
        <li>• Special Reconnaissance (SR)</li>
        <li>• Maritime / littoral operations</li>
        <li>• And more</li>
      </ul>
    ),
  },
  {
    question: "Experience required?",
    answer:
      "Yes. We require basic Arma 3 experience, including familiarity with basic controls.",
  },
  {
    question: "What is the schedule?",
    answer: (
      <>
        1200 EST – 1700 EST start time
        <br />
        Friday, Saturday & Sunday
        <br />
        <span className="text-white/50 text-sm">(Varies based on troop availability)</span>
      </>
    ),
  },
  {
    question: "How do I join / Interested?",
    answer: "Contact a recruiter through our official Discord.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      
      {/* Fine grain */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.022] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-28">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#b91c1c] text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            GET YOUR ANSWERS HERE
          </p>
          
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-wide text-white mb-6 leading-tight">
            FREQUENTLY ASKED<br />QUESTIONS
          </h1>
          
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you have specific career questions or are more generally curious about different processes, we’re here to help. If you can’t find the answers you’re looking for, don’t hesitate to contact us.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-14"
        >
          <div className="relative max-w-xl mx-auto">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search All FAQs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-700 text-white placeholder:text-white/40 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#b91c1c] transition-colors"
            />
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-zinc-800 bg-zinc-900/40"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-zinc-900/60 transition-colors"
              >
                <span className="font-medium text-white pr-6 tracking-wide">
                  {faq.question}
                </span>
                <span className="text-[#b91c1c] text-2xl leading-none flex-shrink-0">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-white/70 text-[15px] leading-relaxed border-t border-zinc-800 pt-5">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Can't Find What You're Looking For */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-40"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            
            {/* Text Side */}
            <div>
              <h3 className="font-heading text-4xl md:text-5xl tracking-wide text-white mb-10 leading-tight">
                CAN'T FIND WHAT YOU<br />ARE LOOKING FOR?
              </h3>
              
              <p className="text-white/65 text-lg md:text-xl leading-relaxed mb-14 max-w-lg">
                If you need more information on certain topics or weren't able to find the answers you need, we are happy to help. Reach out and connect with one of our recruiters.
              </p>

              <a
                href={DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-white text-white font-semibold tracking-widest uppercase text-sm px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
              >
                Chat With a Recruiter
              </a>
            </div>

            {/* Image Side */}
            <div className="w-full">
              <img
                src="https://i.imgur.com/YtuV4mR.png"
                alt="Recruiter"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="mt-28 text-center">
          <Link 
            to="/" 
            className="inline-block text-sm tracking-widest text-white/50 hover:text-white transition-colors uppercase"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}