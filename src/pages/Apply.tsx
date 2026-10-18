import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const DISCORD = "https://discord.gg/8HpRpHsHVT";
const FOOTER_LOGO = "https://i.ibb.co/DP0007hy/footer-logo-1.png";
const DISCORD_CLIENT_ID = "1560566512857915472";
const REDIRECT_URI = encodeURIComponent(window.location.origin + "/apply");

const careerPaths = [
  { value: "O29A", label: "O29A - SPECIAL WARFARE OPERATOR" },
  { value: "M03A", label: "M03A - EXPLOSIVE ORDNANCE DISPOSAL TECHNICIAN" },
  { value: "L02A", label: "L02A - SPECIAL OPERATIONS INDEPENDENT DUTY CORPSMAN" },
];

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
}

const Apply = () => {
  const [step, setStep] = useState<"landing" | "form">("landing");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    careerPath: "",
    reason: "",
    armaExperience: "",
    otherUnits: "",
    milsimExperience: "",
    values: "",
    howFound: "",
    agreeAccuracy: false,
    agreeInterview: false,
    agreeFalseInfo: false,
  });

  // Handle Discord OAuth callback
  useEffect(() => {
    const handleAuth = async () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");

      if (accessToken) {
        try {
          const res = await fetch("https://discord.com/api/users/@me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (res.ok) {
            const user = await res.json();
            setDiscordUser({
              id: user.id,
              username: user.username,
              global_name: user.global_name,
              avatar: user.avatar,
            });
            setStep("form");
            window.history.replaceState({}, document.title, "/apply");
          }
        } catch (err) {
          console.error("Failed to fetch Discord user", err);
        }
      }

      setAuthLoading(false);
    };

    handleAuth();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const loginWithDiscord = () => {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;
    window.location.href = authUrl;
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!discordUser) {
      alert("You must be logged in with Discord to submit.");
      return;
    }

    if (!form.agreeAccuracy || !form.agreeInterview || !form.agreeFalseInfo) {
      alert("You must agree to all statements before submitting.");
      return;
    }

    setLoading(true);

    const careerLabel =
      careerPaths.find((c) => c.value === form.careerPath)?.label || form.careerPath;

    const displayName = discordUser.global_name || discordUser.username;

    // Sequential number using localStorage
    const currentYear = new Date().getFullYear();
    const storageKey = `tacdev-app-counter-${currentYear}`;
    let counter = parseInt(localStorage.getItem(storageKey) || "0", 10);
    counter += 1;
    localStorage.setItem(storageKey, counter.toString());

    const applicationNumber = `NSW-${currentYear}-${counter.toString().padStart(4, "0")}`;

    const embed = {
      title: `ENLISTMENT FORM  •  ${applicationNumber}`,
      color: 0xb91c1c,
      description: "A new enlistment application has been submitted for review.",
      fields: [
        { name: "Full Name", value: form.fullName || "—", inline: true },
        { name: "Discord", value: `${displayName} (@${discordUser.username})`, inline: true },
        { name: "Discord ID", value: discordUser.id, inline: true },
        { name: "Preferred Career Path", value: careerLabel || "—", inline: false },
        { name: "Why do you want to join our organization?", value: form.reason || "—", inline: false },
        { name: "How long have you been playing Arma 3?", value: form.armaExperience || "—", inline: false },
        { name: "Are you currently participating in any other Arma 3 units?", value: form.otherUnits || "—", inline: false },
        { name: "Do you have any prior milsim experience? If so, list them.", value: form.milsimExperience || "—", inline: false },
        { name: "What does Honor, Courage & Commitment mean to you?", value: form.values || "—", inline: false },
        { name: "How did you find out about our organization?", value: form.howFound || "—", inline: false },
      ],
      footer: { text: "TACDEV  •  Naval Special Warfare Enlistment System" },
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `**ENLISTMENT APPLICATION RECEIVED**\nApplicant: <@${discordUser.id}>\nForm ID: \`${applicationNumber}\``,
          embeds: [embed],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again or contact us on Discord.");
    } finally {
      setLoading(false);
    }
  };

  // ── SUCCESS SCREEN ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <h1 className="font-heading text-5xl md:text-6xl mb-6 tracking-wide">
            APPLICATION RECEIVED
          </h1>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Your application has been submitted. A recruiter will review it and contact you on Discord.
          </p>
          <Link
            to="/"
            className="inline-block border border-white/60 text-white text-xs font-semibold tracking-[0.2em] uppercase px-8 py-3 hover:border-[#b91c1c] hover:text-[#b91c1c] transition-all duration-300"
          >
            RETURN HOME
          </Link>
        </motion.div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-white/50 tracking-widest text-sm uppercase">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      
      <AnimatePresence mode="wait">
        {/* ══════════════════════════════════════
            LANDING VIEW
        ══════════════════════════════════════ */}
        {step === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col"
          >
            {/* Top Header */}
            <section className="relative pt-40 pb-24 px-6 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-heading text-5xl sm:text-6xl md:text-7xl tracking-wide text-white uppercase leading-none"
              >
                START YOUR JOURNEY
              </motion.h1>
            </section>

            {/* Become an Operator */}
            <section className="bg-black py-20 px-6 border-t border-zinc-800">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-heading text-3xl md:text-4xl tracking-wide text-white uppercase mb-5">
                  BECOME AN OPERATOR
                </h2>
                <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10">
                  Login with Discord to begin the application process and connect with a TACDEV recruiter.
                </p>

                <button
                  onClick={loginWithDiscord}
                  className="inline-flex items-center gap-3 border border-white/60 text-white text-xs font-semibold tracking-[0.25em] uppercase px-10 py-3.5 hover:border-[#5865F2] hover:text-[#5865F2] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.874.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  LOGIN WITH DISCORD
                </button>
              </div>
            </section>

            {/* Divider */}
            <div className="bg-black px-6">
              <div className="max-w-md mx-auto border-t border-zinc-700" />
            </div>

            {/* Talk to a Recruiter */}
            <section className="bg-black py-20 px-6 flex-1">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-heading text-3xl md:text-4xl tracking-wide text-white uppercase mb-5">
                  TALK TO A RECRUITER
                </h2>
                <p className="text-white/55 text-base max-w-2xl mx-auto mb-14 leading-relaxed">
                  Have a question? Want to learn more about TACDEV? 
                  Our recruiters are standing by to help.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <a
                    href={DISCORD}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center border border-zinc-700 hover:border-[#b91c1c]/50 bg-zinc-950/40 py-12 px-6 transition-all duration-300"
                  >
                    <svg className="w-7 h-7 text-white/50 group-hover:text-[#b91c1c] transition-colors mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                      Discord
                    </span>
                  </a>

                  <Link
                    to="/inquiries"
                    className="group flex flex-col items-center justify-center border border-zinc-700 hover:border-[#b91c1c]/50 bg-zinc-950/40 py-12 px-6 transition-all duration-300"
                  >
                    <svg className="w-7 h-7 text-white/50 group-hover:text-[#b91c1c] transition-colors mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                      Inquiries
                    </span>
                  </Link>

                  <Link
                    to="/faq"
                    className="group flex flex-col items-center justify-center border border-zinc-700 hover:border-[#b91c1c]/50 bg-zinc-950/40 py-12 px-6 transition-all duration-300"
                  >
                    <svg className="w-7 h-7 text-white/50 group-hover:text-[#b91c1c] transition-colors mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                      FAQs
                    </span>
                  </Link>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ══════════════════════════════════════
            APPLICATION FORM VIEW
        ══════════════════════════════════════ */}
        {step === "form" && discordUser && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            {/* Form Header */}
            <section className="pt-36 pb-12 px-6 border-b border-zinc-800">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-[#b91c1c] text-sm uppercase tracking-[0.3em] mb-4 font-medium">
                  ENLISTMENT
                </p>
                <h1 className="font-heading text-4xl md:text-5xl tracking-wide text-white uppercase mb-6">
                  APPLICATION FORM
                </h1>

                {/* Logged in user */}
                <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700 px-5 py-2.5 rounded-full">
                  {discordUser.avatar ? (
                    <img
                      src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
                      alt="Avatar"
                      className="w-7 h-7 rounded-full"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-zinc-700" />
                  )}
                  <span className="text-sm text-white/80">
                    {discordUser.global_name || discordUser.username}
                  </span>
                  <span className="text-xs text-white/40">@{discordUser.username}</span>
                </div>
              </div>
            </section>

            {/* Form */}
            <section className="py-16 px-6">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  <div>
                    <label className="block text-sm font-medium tracking-[0.15em] text-white/70 mb-3 uppercase">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-white/20 focus:border-white/50 outline-none px-4 py-3.5 text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-[0.15em] text-white/70 mb-3 uppercase">
                      Preferred Career Path
                    </label>
                    <select
                      name="careerPath"
                      value={form.careerPath}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-950 border border-white/20 focus:border-white/50 outline-none px-4 py-3.5 text-white transition-colors"
                    >
                      <option value="" disabled className="bg-zinc-950">
                        Select a path
                      </option>
                      {careerPaths.map((path) => (
                        <option key={path.value} value={path.value} className="bg-zinc-950">
                          {path.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-[0.15em] text-white/70 mb-3 uppercase">
                      Why do you want to join our organization?
                    </label>
                    <textarea
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-transparent border border-white/20 focus:border-white/50 outline-none px-4 py-3.5 text-white transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-[0.15em] text-white/70 mb-3 uppercase">
                      How long have you been playing Arma 3?
                    </label>
                    <input
                      name="armaExperience"
                      value={form.armaExperience}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-white/20 focus:border-white/50 outline-none px-4 py-3.5 text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-[0.15em] text-white/70 mb-3 uppercase">
                      Are you currently participating in any other Arma 3 units?
                    </label>
                    <input
                      name="otherUnits"
                      value={form.otherUnits}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-white/20 focus:border-white/50 outline-none px-4 py-3.5 text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-[0.15em] text-white/70 mb-3 uppercase">
                      Do you have any prior milsim experience? If so, list them.
                    </label>
                    <textarea
                      name="milsimExperience"
                      value={form.milsimExperience}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-transparent border border-white/20 focus:border-white/50 outline-none px-4 py-3.5 text-white transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-[0.15em] text-white/70 mb-3 uppercase">
                      What does Honor, Courage & Commitment mean to you?
                    </label>
                    <textarea
                      name="values"
                      value={form.values}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-transparent border border-white/20 focus:border-white/50 outline-none px-4 py-3.5 text-white transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-[0.15em] text-white/70 mb-3 uppercase">
                      How did you find out about our organization?
                    </label>
                    <input
                      name="howFound"
                      value={form.howFound}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-white/20 focus:border-white/50 outline-none px-4 py-3.5 text-white transition-colors"
                    />
                  </div>

                  {/* AGREEMENTS */}
                  <div className="pt-10 border-t border-white/10">
                    <h3 className="text-sm font-medium tracking-[0.2em] text-white/70 mb-8 uppercase">
                      Agreements
                    </h3>

                    <div className="space-y-6">
                      <label className="flex gap-4 cursor-pointer items-start">
                        <input
                          type="checkbox"
                          name="agreeAccuracy"
                          checked={form.agreeAccuracy}
                          onChange={handleChange}
                          required
                          className="mt-1 w-5 h-5 shrink-0 accent-[#b91c1c]"
                        />
                        <span className="text-white/80 text-[15px] leading-relaxed">
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
                          className="mt-1 w-5 h-5 shrink-0 accent-[#b91c1c]"
                        />
                        <span className="text-white/80 text-[15px] leading-relaxed">
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
                          className="mt-1 w-5 h-5 shrink-0 accent-[#b91c1c]"
                        />
                        <span className="text-white/80 text-[15px] leading-relaxed">
                          I understand that if any information on this form is found to be false, 
                          I may be immediately discharged even after graduation.
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full border border-white/50 text-white font-semibold tracking-[0.2em] uppercase text-sm py-4 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
                  </button>
                </form>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-black border-t border-zinc-800 mt-auto">
        <div className="w-full px-3 sm:px-5 md:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 py-14 md:py-16">
            <div className="flex-shrink-0">
              <img src={FOOTER_LOGO} alt="TACDEV" className="h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="lg:max-w-xl xl:max-w-2xl">
              <h4 className="text-white text-sm uppercase tracking-[0.3em] font-medium mb-4 text-left">MISSION</h4>
              <p className="text-white/70 text-sm md:text-base leading-relaxed text-left">
                The United States is a maritime nation, and the U.S. Navy protects America at sea. Alongside our allies and partners, we defend freedom, preserve economic prosperity and keep the seas open and free.
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-700" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 py-12 md:py-14">
            <div className="md:col-span-2 space-y-6">
              <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white hover:bg-[#b91c1c] text-black hover:text-white font-semibold tracking-widest uppercase text-xs px-5 py-2.5 transition-all duration-300">
                Join Discord
              </a>
            </div>
            <div className="hidden md:block md:col-span-1" />
            <div className="md:col-span-2">
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-medium mb-5">Recruitment</h4>
              <div className="space-y-3">
                <Link to="/how-to-join" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">How to Join</Link>
                <Link to="/requirements" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">Requirements</Link>
                <Link to="/apply" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">Apply Now</Link>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-medium mb-5">Get in Touch</h4>
              <div className="space-y-3">
                <Link to="/faq" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">FAQs</Link>
                <Link to="/career-assessment" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">Career Assessment</Link>
                <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">Find a Recruiter</a>
                <Link to="/inquiries" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div className="hidden md:block md:col-span-1" />
            <div className="md:col-span-4">
              <h4 className="text-white text-sm uppercase tracking-[0.3em] font-medium mb-1">Connect</h4>
              <p className="text-white/45 text-xs tracking-widest uppercase mb-6">Get Social With Us</p>
              <div className="flex items-center gap-5 flex-wrap">
                <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="X">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.youtube.com/@tacde4" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Discord">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.874.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-white/35 text-xs tracking-wider">© 2026 TACDEV. All rights reserved.</p>
              <p className="text-white/30 text-[11px] leading-relaxed max-w-3xl text-left md:text-right">
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