import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";

const COIN = "https://i.imgur.com/xEtxsCw.png";

// Shared horizontal padding so every section lines up and spans the full page width.
const GUTTER = "px-6 md:px-12 lg:px-20 xl:px-28";

export default function Personnel() {
  const [showPassword, setShowPassword] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // TODO: replace this block with a real call once the PERSCOM backend exists,
    // e.g. await fetch("/api/perscom/login", { method: "POST", ... }).
    // Never check credentials in the browser: anything in this file is public.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setLoading(false);
    setPassword("");
    setError("PERSCOM access is not yet enabled. Contact organization administration.");
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white font-['Barlow',sans-serif] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0c0c0c]">
        <div className={`${GUTTER} py-5 flex items-center justify-between gap-6`}>
          <Link to="/" className="flex items-center gap-4" aria-label="Return to main site">
            <img src={COIN} alt="TACDEV" className="h-14 sm:h-16 w-auto object-contain" />
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                Naval Special Warfare
              </p>
              <p className="text-lg sm:text-xl font-semibold uppercase tracking-[0.08em]">
                Personnel Command
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-white/65">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/inquiries" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main: info on the left, sign-in on the right, spread across the full width */}
      <main className={`flex-1 ${GUTTER} flex items-center`}>
        <div className="w-full lg:max-w-[1600px] py-12 lg:py-0 grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-24 items-center">
        {/* Sign-in (first on mobile) */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-1 lg:order-2 lg:py-20"
        >
          <div className="bg-[#0e0e0e] border border-white/10">
            <div className="px-8 pt-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5 text-white/50 text-[11px] uppercase tracking-[0.25em]">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                Secure sign-in
              </div>
              <h2 className="mt-3 text-2xl font-semibold uppercase tracking-tight">
                Account Login
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6" noValidate>
              <div>
                <label
                  htmlFor="perscom-id"
                  className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-white/65 mb-2"
                >
                  Service ID or Email
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35"
                    aria-hidden="true"
                  />
                  <input
                    id="perscom-id"
                    type="text"
                    autoComplete="username"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    required
                    className="w-full bg-black border border-white/20 focus:border-[#b91c1c] outline-none pl-11 pr-4 py-3.5 text-[15px] text-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="perscom-password"
                  className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-white/65 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35"
                    aria-hidden="true"
                  />
                  <input
                    id="perscom-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-black border border-white/20 focus:border-[#b91c1c] outline-none pl-11 pr-12 py-3.5 text-[15px] text-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/40 hover:text-white/75 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div aria-live="polite" className="min-h-[1.25rem]">
                {error && (
                  <p className="text-[13px] text-[#fca5a5] border-l-2 border-[#b91c1c] pl-3 py-1 leading-relaxed">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !serviceId || !password}
                className="w-full bg-[#b91c1c] hover:bg-[#dc2626] disabled:bg-white/10 disabled:text-white/35 disabled:cursor-not-allowed text-white font-semibold text-sm uppercase tracking-[0.22em] py-4 transition-colors"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </button>

              <button
                type="button"
                disabled
                title="Discord sign-in is coming soon"
                className="w-full border border-white/15 text-white/40 text-xs uppercase tracking-[0.2em] py-3.5 cursor-not-allowed"
              >
                Sign in with Discord &nbsp;•&nbsp; Coming soon
              </button>
            </form>
          </div>
        </motion.section>

        {/* Left: title and notice */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="order-2 lg:order-1 lg:py-20"
        >
          <p className="text-[#b91c1c] text-xs font-semibold uppercase tracking-[0.3em]">PERSCOM</p>
          <h1 className="mt-3 text-4xl sm:text-5xl xl:text-6xl font-semibold uppercase tracking-tight leading-[1.05]">
            Personnel
            <br />
            Management System
          </h1>
          <div className="mt-8 w-16 h-[2px] bg-[#b91c1c]" />
          <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-2xl">
            Restricted to command staff and members holding an active account issued by
            organization administration.
          </p>

          <p className="mt-12 pt-6 border-t border-white/10 text-[13px] leading-relaxed text-white/50 max-w-2xl">
            Authorized use only. Activity on this system may be monitored and logged. Unauthorized
            access or misuse of information may result in removal from the organization.
          </p>
        </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black">
        <div className={`${GUTTER} py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4`}>
          <p className="text-[12px] text-white/45 tracking-wider">© 2026 TACDEV. All rights reserved.</p>
          <p className="text-[12px] leading-relaxed text-white/45 max-w-3xl md:text-right">
            TACDEV is an independent, fictional Arma 3 community project with no connection to any
            actual military organization.
          </p>
        </div>
      </footer>
    </div>
  );
}
