import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DISCORD_CLIENT_ID = "1560566512857915472";
const REDIRECT_URI = encodeURIComponent(window.location.origin + "/inquiries");
const AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
}

interface SubmittedInquiry {
  name: string;
  subject: string;
  question: string;
}

const Inquiries = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    question: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [submitted, setSubmitted] = useState<SubmittedInquiry | null>(null);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

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
            setToken(accessToken);
            window.history.replaceState({}, document.title, "/inquiries");
            setAuthLoading(false);
            return;
          }
        } catch (err) {
          console.error("Failed to fetch Discord user", err);
        }
      }

      window.location.href = AUTH_URL;
    };

    handleAuth();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!discordUser || !token) {
      window.location.href = AUTH_URL;
      return;
    }

    // Honeypot: pretend it worked
    if (formData.website) {
      setSubmitted({
        name: formData.name,
        subject: formData.subject,
        question: formData.question,
      });
      return;
    }

    setStatus("sending");

    // Copy what was typed BEFORE the form is cleared
    const copy: SubmittedInquiry = {
      name: formData.name.trim(),
      subject: formData.subject.trim(),
      question: formData.question.trim(),
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...copy,
          website: formData.website,
          token,
        }),
      });

      if (response.ok) {
        setSubmitted(copy);
        setStatus("idle");
        setFormData({ name: "", subject: "", question: "", website: "" });
      } else {
        const err = await response.json().catch(() => ({}));
        console.error("Inquiry failed:", response.status, err);
        if (response.status === 401) {
          window.location.href = AUTH_URL;
          return;
        }
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (authLoading || !discordUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/50 tracking-widest text-sm uppercase">Connecting to Discord...</p>
      </div>
    );
  }

  // ── Confirmation page ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white pt-36 pb-24 px-6 md:px-12 lg:px-20 font-['Barlow',sans-serif]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-[#b91c1c] text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Inquiry Sent
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold uppercase tracking-tight mb-6">
            INQUIRY RECEIVED
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-12">
            Your inquiry has been received. A member of the recruitment staff will contact you
            shortly on Discord.
          </p>

          <div className="border border-white/15 bg-white/[0.02] p-6 md:p-8 space-y-8">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-2">Name</p>
              <p className="text-white text-lg break-words">{submitted.name}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-2">Subject</p>
              <p className="text-white text-lg break-words">{submitted.subject}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-2">Message</p>
              <p className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap break-words">
                {submitted.question}
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-block text-center border border-white/60 text-white text-xs font-semibold tracking-[0.2em] uppercase px-8 py-3 hover:border-[#b91c1c] hover:text-[#b91c1c] transition-all duration-300"
            >
              RETURN HOME
            </Link>
            <button
              type="button"
              onClick={() => setSubmitted(null)}
              className="inline-block text-center border border-white/20 text-white/60 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-3 hover:border-white/50 hover:text-white transition-all duration-300"
            >
              SEND ANOTHER
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Form page ──
  return (
    <div className="min-h-screen bg-black text-white pt-36 pb-24 px-6 md:px-12 lg:px-20 font-['Barlow',sans-serif]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-4">
            Contact
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            INQUIRIES
          </h1>
          <div className="w-20 h-px bg-white/20 mt-8" />

          <div className="mt-8 inline-flex items-center gap-3 border border-white/15 px-5 py-2.5 rounded-full">
            {discordUser.avatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
                alt="Avatar"
                className="w-7 h-7 rounded-full"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-white/10" />
            )}
            <span className="text-sm text-white/80">
              {discordUser.global_name || discordUser.username}
            </span>
            <span className="text-xs text-white/40">@{discordUser.username}</span>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-12"
        >
          <div>
            <label className="block text-sm md:text-base uppercase tracking-[0.2em] text-white mb-4 font-medium">
              Contact Information
            </label>
            <input
              type="text"
              name="name"
              required
              maxLength={200}
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-transparent border border-white/15 px-5 py-4 text-white text-lg md:text-xl placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[13px] uppercase tracking-[0.2em] text-white/50 mb-3">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              required
              maxLength={200}
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/15 px-5 py-4 text-white text-lg focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[13px] uppercase tracking-[0.2em] text-white/50 mb-3">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="question"
              required
              rows={10}
              maxLength={1000}
              value={formData.question}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/15 px-5 py-4 text-white text-lg focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-14 py-4 bg-white text-black text-sm font-medium tracking-[0.15em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Submit Inquiry"}
            </button>

            {status === "error" && (
              <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Inquiries;