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

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "New Inquiry",
              color: 0xb91c1c,
              fields: [
                { name: "Name", value: formData.name || "—", inline: true },
                { name: "Discord", value: formData.discord || "—", inline: true },
                { name: "Subject", value: formData.subject || "—", inline: false },
                { name: "Message", value: formData.question || "—", inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "TACDEV Inquiries" },
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
    <div className="min-h-screen bg-black text-white pt-36 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
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
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-12"
        >
          {/* Name + Discord */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-[13px] uppercase tracking-[0.2em] text-white/50 mb-3">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 px-5 py-4 text-white text-lg focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] uppercase tracking-[0.2em] text-white/50 mb-3">
                Discord Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="discord"
                required
                value={formData.discord}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 px-5 py-4 text-white text-lg focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
          </div>

          {/* Subject */}
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

          {/* Message */}
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

          {/* Submit */}
          <div className="pt-6 flex items-center gap-8">
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-14 py-4 bg-white text-black text-sm font-medium tracking-[0.15em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
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