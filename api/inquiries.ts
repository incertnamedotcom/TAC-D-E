import { motion } from "motion/react";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";

const DISCORD_CLIENT_ID = "1560566512857915472";
const REDIRECT_URI = encodeURIComponent(window.location.origin + "/inquiries");

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
}

const Inquiries = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    question: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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

      const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;
      window.location.href = authUrl;
    };

    handleAuth();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!discordUser || !token) {
      const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;
      window.location.href = authUrl;
      return;
    }

    if (formData.website) {
      setStatus("success");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          discord: `${discordUser.global_name || discordUser.username} (@${discordUser.username})`,
          subject: formData.subject,
          question: formData.question,
          website: formData.website,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          subject: "",
          question: "",
          website: "",
        });
      } else {
        const err = await response.json().catch(() => ({}));
        console.error("Inquiry failed:", err);
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
        <p className="text-white/50 tracking-widest text-sm uppercase">
          Connecting to Discord...
        </p>
      </div>
    );
  }

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
              value={formData.question}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/15 px-5 py-4 text-white text-lg focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
          </div>

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

            {status === "success" && (
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                Your inquiry has been received. A member of the recruitment staff will contact you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Inquiries;