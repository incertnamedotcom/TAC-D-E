import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { branchCards } from "./careers/_lib/data";

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1542908569693978714/hTIfakw3EWWDW6e7QWpT2Hd4pnqrsjj9RrEbkpEjpiuT3kSR18obY5FJoYoyjTy4lt_i";

const careerPathsByBranch: Record<string, { value: string; label: string }[]> = {
  navy: [
    { value: "O29A", label: "O29A - SPECIAL WARFARE OPERATOR" },
    { value: "M03A", label: "M03A - EXPLOSIVE ORDNANCE DISPOSAL TECHNICIAN" },
    { value: "L02A", label: "L02A - SPECIAL OPERATIONS INDEPENDENT DUTY CORPSMAN" },
  ],
  airforce: [
    { value: "1C2X1", label: "1C2X1 - COMBAT CONTROLLER SPECIALIST" },
    { value: "1T2X1", label: "1T2X1 - PARARESCUE SPECIALIST" },
  ],
  army: [],
};

const formLogos: Record<string, string> = {
  navy: "https://i.imgur.com/fbWOWAr.png",
  airforce: "https://i.imgur.com/caKgnFX.png",
};

const formTitles: Record<string, string> = {
  navy: "NAVY ENLISTMENT FORM",
  airforce: "AIR FORCE ENLISTMENT FORM",
};

const Apply = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<"select" | "form">("select");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    careerPath: "",
    reason: "",
    armaExperience: "",
    otherUnits: "",
    milsimExperience: "",
    values: "",
    howFound: "",
    discord: "",
    agreeAccuracy: false,
    agreeInterview: false,
    agreeFalseInfo: false,
  });

  useEffect(() => {
    const branchFromUrl = searchParams.get("branch");
    if (branchFromUrl && ["navy", "army", "airforce"].includes(branchFromUrl)) {
      if (branchFromUrl === "army") {
        setStep("select");
        setSelectedBranch(null);
      } else {
        setSelectedBranch(branchFromUrl);
        setStep("form");
      }
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleBranchSelect = (branchId: string) => {
    if (branchId === "army") {
      alert("Army applications are currently unavailable.");
      return;
    }
    setSelectedBranch(branchId);
    setForm((prev) => ({ ...prev, careerPath: "" }));
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBranch || selectedBranch === "army") return;

    if (!form.agreeAccuracy || !form.agreeInterview || !form.agreeFalseInfo) {
      alert("You must agree to all statements before submitting.");
      return;
    }

    setLoading(true);

    const branchLabel =
      branchCards.find((b) => b.slug === selectedBranch)?.label || selectedBranch;

    const careerOptions = careerPathsByBranch[selectedBranch] || [];
    const careerLabel =
      careerOptions.find((c) => c.value === form.careerPath)?.label || form.careerPath;

    const embed = {
      title: `New Application — ${branchLabel}`,
      color:
        selectedBranch === "navy"
          ? 0x1e40af
          : selectedBranch === "airforce"
          ? 0x0ea5e9
          : 0x166534,
      fields: [
        { name: "Full Name", value: form.fullName || "—", inline: true },
        { name: "Discord", value: form.discord || "—", inline: true },
        { name: "Career Path", value: careerLabel || "—", inline: false },
        { name: "Why join TACDEV?", value: form.reason || "—", inline: false },
        { name: "Arma 3 Experience", value: form.armaExperience || "—", inline: false },
        { name: "Other Units", value: form.otherUnits || "—", inline: false },
        { name: "Prior Milsim Experience", value: form.milsimExperience || "—", inline: false },
        { name: "Honor, Courage & Commitment", value: form.values || "—", inline: false },
        { name: "How did you find us?", value: form.howFound || "—", inline: false },
      ],
      footer: { text: "TACDEV Application System" },
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📥 **New ${branchLabel} application received**`,
          embeds: [embed],
        }),
      });
      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again or contact us on Discord.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <h1 className="font-heading text-5xl mb-6">APPLICATION RECEIVED</h1>
          <p className="text-white/70 text-lg mb-10">
            Your application has been submitted. A recruiter will review it and
            contact you on Discord.
          </p>
          <Link
            to="/"
            className="inline-block border-2 border-white text-white font-semibold tracking-widest uppercase text-sm px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            RETURN HOME
          </Link>
        </motion.div>
      </div>
    );
  }

  const currentCareerPaths = selectedBranch
    ? careerPathsByBranch[selectedBranch] || []
    : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-0">
      <div className="max-w-7xl mx-auto px-6 pb-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-red-500 text-sm uppercase tracking-[0.25em] mb-4">
            ENLISTMENT
          </p>
          <h1 className="font-heading text-5xl md:text-6xl tracking-wide">
            APPLY NOW
          </h1>
          <div className="w-14 h-[2px] bg-red-600 mx-auto mt-8" />
        </motion.div>

        {/* Branch Selection */}
        {step === "select" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {branchCards.map((branch) => {
              const isArmy = branch.slug === "army";
              return (
                <button
                  key={branch.slug}
                  onClick={() => handleBranchSelect(branch.slug)}
                  disabled={isArmy}
                  className={`group relative aspect-[3/4] bg-zinc-900 border overflow-hidden transition-all duration-300
                    ${isArmy
                      ? "border-zinc-800 opacity-40 cursor-not-allowed grayscale"
                      : "border-zinc-700 hover:border-red-600/60"
                    }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-10 md:p-14">
                    <img
                      src={branch.logo}
                      alt={branch.label}
                      className={`w-full h-full max-h-[65%] object-contain transition-all duration-500
                        ${isArmy ? "opacity-40" : "opacity-90 group-hover:opacity-100 group-hover:scale-105"}`}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="font-heading text-2xl md:text-3xl tracking-wide text-white uppercase text-center">
                      {branch.label}
                    </h3>
                    {isArmy ? (
                      <p className="text-center text-red-500 text-sm mt-3 tracking-widest uppercase">
                        Currently Unavailable
                      </p>
                    ) : (
                      <div className="w-12 h-[2px] bg-red-600 mt-4 mx-auto transition-all duration-300 group-hover:w-20" />
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Application Form */}
        {step === "form" && selectedBranch && selectedBranch !== "army" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={() => setStep("select")}
              className="text-red-500 text-sm tracking-widest uppercase mb-10 hover:text-red-400 transition-colors"
            >
              ← CHANGE BRANCH
            </button>

            {/* Form Header with bigger logo + title */}
            <div className="text-center mb-12">
              <img
                src={formLogos[selectedBranch]}
                alt={`${selectedBranch} logo`}
                className="h-40 md:h-52 w-auto mx-auto object-contain mb-8"
              />
              <h2 className="font-heading text-4xl md:text-5xl tracking-wide text-white uppercase">
                {formTitles[selectedBranch]}
              </h2>
              <div className="w-14 h-[2px] bg-red-600 mx-auto mt-6" />
            </div>

            {/* Overview */}
            <div className="mb-12 p-6 bg-zinc-900/60 border border-zinc-800 rounded-lg">
              <p className="text-white/80 text-[15px] leading-relaxed">
                This enlistment form is for individuals seeking to join{" "}
                <strong className="text-white font-semibold">Naval Special Warfare</strong>. 
                It is used to assess{" "}
                <strong className="text-white font-semibold">basic information, availability</strong>, and{" "}
                <strong className="text-white font-semibold">overall suitability</strong> for participation. 
                Applicants are expected to demonstrate{" "}
                <strong className="text-white font-semibold">reliability, willingness to learn</strong>, and the ability to{" "}
                <strong className="text-white font-semibold">work within a team environment</strong>.
              </p>
              <p className="text-white/80 text-[15px] leading-relaxed mt-4">
                Completion of this form is the first step in the enlistment process and helps determine readiness to move forward into{" "}
                <strong className="text-white font-semibold">assessment and selection</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Full Name */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  FULL NAME (FIRST, MIDDLE, LAST)
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white placeholder:text-white/30 transition-colors"
                  placeholder="John Michael Doe"
                />
              </div>

              {/* Career Path */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  PREFERRED CAREER PATH
                </label>
                <select
                  name="careerPath"
                  value={form.careerPath}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white transition-colors"
                >
                  {/* Only show placeholder when nothing is selected yet */}
                  {form.careerPath === "" && (
                    <option value="" disabled className="bg-zinc-900">
                      SELECT CAREER PATH
                    </option>
                  )}
                  {currentCareerPaths.map((path) => (
                    <option key={path.value} value={path.value} className="bg-zinc-900">
                      {path.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Why join */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  WHY DO YOU WANT TO JOIN OUR ORGANIZATION?
                </label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white placeholder:text-white/30 transition-colors resize-none"
                  placeholder="Explain your motivation..."
                />
              </div>

              {/* Arma experience */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  HOW LONG HAVE YOU BEEN PLAYING ARMA 3?
                </label>
                <input
                  name="armaExperience"
                  value={form.armaExperience}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white placeholder:text-white/30 transition-colors"
                  placeholder="e.g. 3 years / 1500 hours"
                />
              </div>

              {/* Other units */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  ARE YOU CURRENTLY PARTICIPATING IN ANY OTHER ARMA 3 UNITS?
                </label>
                <input
                  name="otherUnits"
                  value={form.otherUnits}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white placeholder:text-white/30 transition-colors"
                  placeholder="Yes / No – if yes, list them"
                />
              </div>

              {/* Prior milsim */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  DO YOU HAVE ANY PRIOR MILSIM EXPERIENCE? IF SO, LIST THEM.
                </label>
                <textarea
                  name="milsimExperience"
                  value={form.milsimExperience}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white placeholder:text-white/30 transition-colors resize-none"
                  placeholder="List previous units, roles, and duration..."
                />
              </div>

              {/* Values */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  WHAT DOES HONOR, COURAGE & COMMITMENT MEAN TO YOU?
                </label>
                <textarea
                  name="values"
                  value={form.values}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white placeholder:text-white/30 transition-colors resize-none"
                  placeholder="Your answer..."
                />
              </div>

              {/* How found */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  HOW DID YOU FIND OUT ABOUT OUR ORGANIZATION?
                </label>
                <input
                  name="howFound"
                  value={form.howFound}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white placeholder:text-white/30 transition-colors"
                  placeholder="Discord, friend, website, etc."
                />
              </div>

              {/* Discord */}
              <div>
                <label className="block text-base font-semibold tracking-wide text-white mb-2 uppercase">
                  DISCORD USERNAME
                </label>
                <input
                  name="discord"
                  value={form.discord}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none px-4 py-3.5 text-white placeholder:text-white/30 transition-colors"
                  placeholder="username"
                />
              </div>

              {/* AGREEMENTS */}
              <div className="pt-8 border-t border-zinc-800">
                <h3 className="font-heading text-2xl tracking-wide text-white mb-6 uppercase">
                  AGREEMENTS
                </h3>

                <div className="space-y-6">
                  <label className="flex gap-4 cursor-pointer items-start">
                    <input
                      type="checkbox"
                      name="agreeAccuracy"
                      checked={form.agreeAccuracy}
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5 shrink-0 accent-red-600"
                    />
                    <span className="text-white/90 text-[15px] leading-relaxed">
                      I have reviewed the information provided in this form and affirm that it is accurate to the best of my knowledge. 
                      By submitting this form I understand that participating in other units will result in denial of application. 
                      I consent to background checks as required by the Organization.
                    </span>
                  </label>

                  <label className="flex gap-4 cursor-pointer items-start">
                    <input
                      type="checkbox"
                      name="agreeInterview"
                      checked={form.agreeInterview}
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5 shrink-0 accent-red-600"
                    />
                    <span className="text-white/90 text-[15px] leading-relaxed">
                      I agree to attend an interview should my application be selected.
                    </span>
                  </label>

                  <label className="flex gap-4 cursor-pointer items-start">
                    <input
                      type="checkbox"
                      name="agreeFalseInfo"
                      checked={form.agreeFalseInfo}
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5 shrink-0 accent-red-600"
                    />
                    <span className="text-white/90 text-[15px] leading-relaxed">
                      I understand that if any information on this form is found to be false, 
                      I may be immediately discharged even after graduation.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full border-2 border-white text-white font-semibold tracking-widest uppercase text-sm py-5 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
              </button>
            </form>
          </motion.div>
        )}
      </div>

{/* ── FOOTER ── */}
<footer className="bg-black border-t border-zinc-800">
  <div className="max-w-[90rem] mx-auto px-8 md:px-16">
    
    {/* Main Grid */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 py-16 md:py-20">
      
      {/* Brand Column */}
      <div className="md:col-span-4 space-y-6">
        <img 
          src="https://i.imgur.com/xEtxsCw.png" 
          alt="TACDEV" 
          className="h-20 w-auto object-contain opacity-90"
        />
        <p className="text-white/55 text-sm leading-relaxed max-w-xs">
          Naval Special Warfare element. Discipline. Realism. Trust.
        </p>
        <a 
          href="https://discord.gg/8HpRpHsHVT" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-white hover:bg-[#b91c1c] text-black hover:text-white font-semibold tracking-widest uppercase text-xs px-5 py-2.5 transition-all duration-300"
        >
          Join Discord
        </a>
      </div>

      {/* Recruitment Links */}
      <div className="md:col-span-2">
        <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-medium mb-5">
          Recruitment
        </h4>
        <div className="space-y-3">
          <Link to="/how-to-join" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
            How to Join
          </Link>
          <Link to="/requirements" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
            Requirements
          </Link>
          <a href="https://discord.gg/8HpRpHsHVT" target="_blank" rel="noopener noreferrer" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
            Apply Now
          </a>
        </div>
      </div>

      {/* Resources Links */}
      <div className="md:col-span-2">
        <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-medium mb-5">
          Resources
        </h4>
        <div className="space-y-3">
          <Link to="/faq" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
            FAQs
          </Link>
          <Link to="/career-assessment" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
            Career Assessment
          </Link>
          <a href="https://discord.gg/8HpRpHsHVT" target="_blank" rel="noopener noreferrer" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
            Find a Recruiter
          </a>
          <a href="https://discord.gg/8HpRpHsHVT" target="_blank" rel="noopener noreferrer" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>

      {/* Social / Connect Column */}
      <div className="md:col-span-4 md:pl-8">
        <h4 className="text-white text-sm uppercase tracking-[0.3em] font-medium mb-1">
          Connect
        </h4>
        <p className="text-white/45 text-xs tracking-widest uppercase mb-6">
          Get Social With Us
        </p>
        
        <div className="flex items-center gap-5">
          <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="X">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
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
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-zinc-800 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="text-white/35 text-xs tracking-wider">
          © 2025 TACDEV. All rights reserved.
        </p>
        
        <p className="text-white/30 text-[11px] leading-relaxed max-w-2xl text-left md:text-right">
          TACDEV is an independent, fictional Arma 3 community project. We have no connection to DEVGRU, the U.S. Navy, JSOC, USSOCOM, or any actual military organization. Everything on this site, including names, procedures, structure, branding, and content, is purely fictional and created for community purposes.
        </p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Apply;