import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const DISCORD = "https://discord.gg/8HpRpHsHVT";

const QUESTIONS = [
  {
    id: 1,
    question: "Which operational environment interests you most?",
    options: [
      { text: "Maritime / Coastal operations", value: "maritime" },
      { text: "Airborne / Aviation support", value: "air" },
      { text: "Direct Action & special reconnaissance", value: "da" },
      { text: "Explosive ordnance & technical operations", value: "eod" },
    ],
  },
  {
    id: 2,
    question: "How do you prefer to contribute in a team?",
    options: [
      { text: "Direct combat / assault roles", value: "operator" },
      { text: "Medical & trauma care under fire", value: "medical" },
      { text: "Technical / specialist support", value: "technical" },
      { text: "Command & control / communications", value: "cct" },
    ],
  },
  {
    id: 3,
    question: "What level of physical and mental intensity are you seeking?",
    options: [
      { text: "Extreme selection & continuous high-tempo operations", value: "extreme" },
      { text: "High intensity with strong technical focus", value: "high-tech" },
      { text: "High intensity with medical specialization", value: "high-med" },
      { text: "Challenging but balanced operational tempo", value: "balanced" },
    ],
  },
  {
    id: 4,
    question: "Which statement best describes you?",
    options: [
      { text: "I want to be on the tip of the spear", value: "so" },
      { text: "I want to neutralize explosive threats", value: "eod" },
      { text: "I want to provide advanced medical care in the field", value: "medic" },
      { text: "I want to enable and control the battlespace from the air", value: "cct-pj" },
    ],
  },
];

export default function CareerAssessment() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStartQuiz = () => {
    setStep("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("result");
    }
  };

  const getRecommendation = () => {
    const last = answers[3];
    if (last === "so") return "Special Warfare Operator (SO)";
    if (last === "eod") return "Explosive Ordnance Disposal (EOD)";
    if (last === "medic") return "Special Operations Independent Duty Corpsman (SOIDC)";
    if (last === "cct-pj") return "Combat Controller or Pararescue";
    return "Special Warfare Operator (SO)";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      
      <AnimatePresence mode="wait">
// In CareerAssessment.tsx – replace the intro section with this:

{/* ── INTRO ── */}
{step === "intro" && (
  <motion.div
    key="intro"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="relative h-screen flex items-center"
  >
    {/* Background Image - Full screen */}
    <div className="absolute inset-0">
      <img
        src="https://i.imgur.com/DCjut3E.jpeg"
        alt="Operator"
        className="w-full h-full object-cover object-center"
      />
      {/* Strong left-to-right fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/30" />
    </div>

    {/* Content */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[2px] bg-red-600" />
          <p className="text-red-500 text-sm uppercase tracking-[0.25em] font-medium">
            Career Assessment
          </p>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-8">
          Your Future<br />Starts Here
        </h1>

        <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
          Take this short quiz to narrow down your choices and see jobs you might be interested in. We’re ready when you are.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleStartQuiz}
            className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold tracking-widest uppercase text-sm px-10 py-4 transition-all duration-300"
          >
            Start the Quiz
          </button>

          <Link
            to="/careers"
            className="border border-white/40 hover:border-white hover:bg-white/5 text-white font-semibold tracking-widest uppercase text-sm px-10 py-4 transition-all duration-300 text-center"
          >
            All Opportunities
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
)}
        {/* ── QUIZ ── */}
        {step === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto px-6 py-24 md:py-32"
          >
            {/* Progress */}
            <div className="mb-12">
              <div className="flex justify-between text-xs tracking-widest text-white/50 mb-3 uppercase">
                <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-[2px] bg-zinc-800">
                <div
                  className="h-full bg-red-600 transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl tracking-wide mb-10 leading-tight">
              {QUESTIONS[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left px-6 py-5 border border-zinc-700 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 group"
                >
                  <span className="text-white/90 group-hover:text-white tracking-wide">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("intro")}
              className="mt-14 text-sm tracking-widest text-white/40 hover:text-white transition-colors uppercase"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* ── RESULT ── */}
        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto px-6 py-24 md:py-32 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-red-600" />
              <p className="text-red-500 text-sm uppercase tracking-[0.25em] font-medium">
                Recommended Path
              </p>
              <div className="w-12 h-[2px] bg-red-600" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl tracking-wide mb-6">
              {getRecommendation()}
            </h2>

            <p className="text-white/65 text-lg mb-12 max-w-lg mx-auto">
              Based on your responses, this role aligns with your interests and operational preferences. Speak with a recruiter to learn more about the pipeline and requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold tracking-widest uppercase text-sm px-8 py-4 transition-all duration-300"
              >
                Speak to a Recruiter
              </a>

              <button
                onClick={handleStartQuiz}
                className="border border-white/30 hover:border-white text-white font-semibold tracking-widest uppercase text-sm px-8 py-4 transition-all duration-300"
              >
                Retake Quiz
              </button>
            </div>

            <div className="mt-16">
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
    </div>
  );
}