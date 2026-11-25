import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const DISCORD = "https://discord.gg/8HpRpHsHVT";
const FOOTER_LOGO = "https://i.ibb.co/DP0007hy/footer-logo-1.png";
const NAVBAR_COIN = "https://i.imgur.com/xEtxsCw.png";

type Path = "so" | "eod" | "medic";

const QUESTIONS = [
  {
    id: 1,
    question: "Which mission set draws you in the most?",
    options: [
      {
        text: "Direct action, reconnaissance, and maritime special operations",
        value: "so" as Path,
      },
      {
        text: "Locating, identifying, and rendering safe explosive threats",
        value: "eod" as Path,
      },
      {
        text: "Delivering advanced medical care under fire and in austere environments",
        value: "medic" as Path,
      },
    ],
  },
  {
    id: 2,
    question: "How do you prefer to contribute inside a small team?",
    options: [
      {
        text: "As a combat operator executing the assault or reconnaissance task",
        value: "so" as Path,
      },
      {
        text: "As the technical specialist solving complex ordnance and hazard problems",
        value: "eod" as Path,
      },
      {
        text: "As the medical authority responsible for trauma care and casualty survival",
        value: "medic" as Path,
      },
    ],
  },
  {
    id: 3,
    question: "Which training focus appeals to you most?",
    options: [
      {
        text: "Combat diving, parachuting, CQB, and sustained high-tempo field operations",
        value: "so" as Path,
      },
      {
        text: "Explosive theory, robotics, render-safe procedures, and technical diagnostics",
        value: "eod" as Path,
      },
      {
        text: "Trauma medicine, prolonged field care, and independent clinical decision-making",
        value: "medic" as Path,
      },
    ],
  },
  {
    id: 4,
    question: "In a high-stress scenario, what role feels most natural?",
    options: [
      {
        text: "Leading or supporting the fight as part of the assault element",
        value: "so" as Path,
      },
      {
        text: "Methodically assessing and neutralizing a lethal device under pressure",
        value: "eod" as Path,
      },
      {
        text: "Stabilizing wounded teammates and managing care until evacuation",
        value: "medic" as Path,
      },
    ],
  },
];

const RESULTS: Record<
  Path,
  { title: string; description: string; href: string }
> = {
  so: {
    title: "Special Warfare Operator / D&E Operator",
    description:
      "Your answers point toward a direct-action and special reconnaissance path. Special Warfare Operators operate at the tip of the spear across maritime, land, and airborne environments.",
    href: "/careers/navy/seal",
  },
  eod: {
    title: "Explosive Ordnance Disposal Technician",
    description:
      "Your answers align with a technical, high-stakes specialty. EOD Technicians locate, identify, and render safe explosive threats in support of special operations missions.",
    href: "/careers/navy/eod",
  },
  medic: {
    title: "Hospital Corpsman Advanced Technical Field",
    description:
      "Your answers favor an advanced medical path. Corpsmen in this pipeline provide trauma care, prolonged field treatment, and clinical support inside special operations elements.",
    href: "/careers/navy/corpsman",
  },
};

export default function CareerAssessment() {
  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Path[]>([]);
  const [selected, setSelected] = useState<Path | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (value: Path) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;

    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      window.scrollTo(0, 0);
    } else {
      setStep("result");
      window.scrollTo(0, 0);
    }
  };

  const handleRestart = () => {
    setStep("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelected(null);
    window.scrollTo(0, 0);
  };

  const getRecommendation = (): Path => {
    const scores: Record<Path, number> = { so: 0, eod: 0, medic: 0 };
    answers.forEach((a) => {
      scores[a] += 1;
    });

    if (scores.so >= scores.eod && scores.so >= scores.medic) return "so";
    if (scores.eod >= scores.medic) return "eod";
    return "medic";
  };

  const result = step === "result" ? RESULTS[getRecommendation()] : null;
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white font-['Barlow',sans-serif]">
      <AnimatePresence mode="wait">
        {/* ── QUIZ ── */}
        {step === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative min-h-screen"
          >
            {/* Right-half background image only */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 overflow-hidden">
              <motion.img
                src="https://i.imgur.com/a0wAqVs.jpeg"
                alt=""
                className="w-full h-full object-cover object-center"
                initial={{ y: 0 }}
                animate={{ y: -10 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              />
              {/* Smooth black fade from left edge of the image */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-16 md:pt-20 pb-32 min-h-screen">
              {/* Top bar */}
              <div className="px-6 md:px-10 lg:px-16 mb-12">
                <div className="flex items-center justify-between mb-5 max-w-xl">
                  <Link
                    to="/careers"
                    className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors flex items-center gap-2"
                  >
                    ← Exit Quiz
                  </Link>
                  <span className="text-xs tracking-widest text-white/40 uppercase">
                    {currentQuestion + 1} / {QUESTIONS.length}
                  </span>
                </div>
                <div className="h-[2px] bg-white/10 max-w-xl">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question area */}
              <div className="px-6 md:px-10 lg:px-16">
                <div className="max-w-xl">
                  <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-5 font-medium">
                    Select one
                  </p>

                  <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-tight mb-10 uppercase">
                    {QUESTIONS[currentQuestion].question}
                  </h2>

                  <div className="space-y-3 mb-12">
                    {QUESTIONS[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(option.value)}
                        className={`w-full text-left px-5 py-4 border transition-all duration-300 ${
                          selected === option.value
                            ? "border-white bg-white/10 text-white"
                            : "border-white/15 bg-black/50 text-white/75 hover:border-white/40 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-sm md:text-base tracking-wide">
                          {option.text}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!selected}
                    className={`px-10 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                      selected
                        ? "bg-white text-black hover:bg-[#b91c1c] hover:text-white"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? "See Results" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── RESULT ── */}
        {step === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto px-6 py-32 text-center min-h-screen flex flex-col justify-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-white/40" />
              <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-medium">
                Recommended Path
              </p>
              <div className="w-12 h-[1px] bg-white/40" />
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              {result.title}
            </h2>

            <p className="text-white/60 text-lg mb-12 max-w-lg mx-auto">
              {result.description} Speak with a recruiter to learn more about the pipeline and
              requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={result.href}
                className="bg-white hover:bg-[#b91c1c] text-black hover:text-white font-semibold tracking-widest uppercase text-sm px-8 py-4 transition-all duration-300"
              >
                View Career Details
              </Link>

              <a
                href={DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 hover:border-white text-white font-semibold tracking-widest uppercase text-sm px-8 py-4 transition-all duration-300"
              >
                Speak to a Recruiter
              </a>
            </div>

            <div className="mt-10">
              <button
                onClick={handleRestart}
                className="text-sm tracking-widest text-white/40 hover:text-white transition-colors uppercase"
              >
                Retake Quiz
              </button>
            </div>

            <div className="mt-8">
              <Link
                to="/careers"
                className="text-sm tracking-widest text-white/40 hover:text-white transition-colors uppercase"
              >
                View All Opportunities →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOOTER (slightly larger than original, not as big as last) ── */}
      <footer className="w-full bg-black border-t border-white/10 mt-auto font-['Barlow',sans-serif]">
        <div className="w-full px-3 sm:px-5 md:px-8 lg:px-10 xl:px-12">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 py-14 md:py-16">
            <div className="flex-shrink-0">
              <img 
                src={FOOTER_LOGO} 
                alt="TACDEV" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            <div className="lg:max-w-xl xl:max-w-2xl">
              <h4 className="text-white text-[13px] uppercase tracking-[0.3em] font-semibold mb-4 text-left">
                MISSION
              </h4>
              <p className="text-white/65 text-[15px] md:text-base leading-relaxed text-left">
                The United States is a maritime nation, and the U.S. Navy protects America at sea. Alongside our allies and partners, we defend freedom, preserve economic prosperity and keep the seas open and free.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 py-12 md:py-14 items-start">
            
            <div className="md:col-span-2 flex items-start">
              <img
                src={NAVBAR_COIN}
                alt="TACDEV"
                className="h-28 md:h-32 w-auto object-contain opacity-90"
              />
            </div>

            <div className="md:col-span-2 md:col-start-4">
              <h4 className="text-[#b91c1c] text-[13px] uppercase tracking-[0.25em] font-semibold mb-5">
                Recruitment
              </h4>
              <div className="space-y-3">
                <Link to="/requirements" className="block text-[15px] tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  Requirements
                </Link>
                <Link to="/apply" className="block text-[15px] tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[#b91c1c] text-[13px] uppercase tracking-[0.25em] font-semibold mb-5">
                Get in Touch
              </h4>
              <div className="space-y-3">
                <Link to="/faq" className="block text-[15px] tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  FAQs
                </Link>
                <Link to="/career-assessment" className="block text-[15px] tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  Career Assessment
                </Link>
                <Link to="/inquiries" className="block text-[15px] tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="md:col-span-3 md:col-start-10">
              <h4 className="text-white text-[13px] uppercase tracking-[0.3em] font-semibold mb-1">
                Connect
              </h4>
              <p className="text-white/40 text-[13px] tracking-[0.2em] uppercase mb-6">
                Get Social With Us
              </p>
              
              <div className="flex items-center gap-5">
                <a 
                  href="https://www.instagram.com/development_evaluations.4/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors" 
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>

                <a 
                  href="https://www.youtube.com/@tacde4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors" 
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <a 
                  href={DISCORD} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors" 
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.874.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-white/40 text-xs tracking-[0.15em]">
                © 2026 NSWTACD&E
              </p>
              
              <p className="text-white/30 text-[12px] leading-relaxed max-w-3xl text-left md:text-right">
               TACDEV is a fictional Arma 3 community project. It is not affiliated with or endorsed by any real military or government organization.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};