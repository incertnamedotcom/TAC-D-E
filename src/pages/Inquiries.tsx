import { motion } from "motion/react";
import { useState } from "react";

const Inquiries = () => {
  const [formData, setFormData] = useState({
    name: "",
    discord: "",
    subject: "",
    question: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const WEBHOOK_URL = "https://discord.com/api/webhooks/1556755950050873414/0FEadgD8jD9cZDpSeLVHqu0d1PYDI9g8Uk_p50zegoAk4rw7QYBQf_mv4bIk9NBzBBmI";

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "New Inquiry",
              color: 0xb91c1c,
              fields: [
                { name: "Name", value: formData.name, inline: true },
                { name: "Discord", value: formData.discord, inline: true },
                { name: "Subject", value: formData.subject },
                { name: "Message", value: formData.question },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", discord: "", subject: "", question: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-3">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide">
            INQUIRIES
          </h1>
          <div className="w-16 h-px bg-white/20 mt-6" />
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Name + Discord */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] uppercase tracking-[0.2em] text-white/50 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Your name or callsign"
              />
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-[0.2em] text-white/50 mb-2">
                Discord Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="discord"
                required
                value={formData.discord}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="username or @username"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[12px] uppercase tracking-[0.2em] text-white/50 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/15 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Brief subject"
            />
          </div>

          {/* Question */}
          <div>
            <label className="block text-[12px] uppercase tracking-[0.2em] text-white/50 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="question"
              required
              rows={6}
              value={formData.question}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/15 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors resize-none"
              placeholder="Type your message here..."
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-10 py-3.5 bg-white text-black text-sm font-medium tracking-[0.15em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Submit Inquiry"}
            </button>

            {status === "success" && (
              <p className="text-green-500 text-sm">Inquiry submitted successfully.</p>
            )}
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