import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect } from "react";

const DISCORD = "https://discord.gg/8HpRpHsHVT";
const FOOTER_LOGO = "https://i.ibb.co/DP0007hy/footer-logo-1.png";
const NAVBAR_COIN = "https://i.imgur.com/xEtxsCw.png";

export default function Requirements() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const requirements = [
    {
      number: "01",
      title: "Legal Copy of Arma 3",
      description:
        "You must own a legitimate copy of Arma 3. Pirated or cracked versions are not accepted under any circumstances.",
    },
    {
      number: "02",
      title: "Age Requirement",
      description:
        "Applicants must be 18 years of age or older. Waivers may be considered on a case-by-case basis at the discretion of leadership.",
    },
    {
      number: "03",
      title: "Communication Standards",
      description:
        "You must be fluent in English and possess a working microphone free of static, echo, or any other audio issues that hinder clear communication.",
    },
    {
      number: "04",
      title: "Exclusive Commitment",
      description:
        "You must not be an active member of any other Arma 3 unit. Dual membership is strictly prohibited.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-['Barlow',sans-serif] relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://i.imgur.com/DCjut3E.jpeg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-[2px] bg-[#b91c1c]" />
              <p className="text-[#b91c1c] text-sm uppercase tracking-[0.3em] font-medium">
                Recruitment
              </p>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-wide text-white leading-none">
              REQUIREMENTS
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mb-20"
        >
          All applicants are expected to meet the following standards prior to submitting an
          application. Failure to meet any of these requirements will result in automatic
          disqualification.
        </motion.p>

        <div className="space-y-14 md:space-y-16">
          {requirements.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col md:flex-row md:items-start gap-5 md:gap-10"
            >
              <span className="font-heading text-3xl md:text-4xl text-[#b91c1c] tracking-wider shrink-0">
                {item.number}
              </span>

              <div className="flex-1 border-t border-white/10 pt-5 md:pt-0 md:border-t-0">
                <h3 className="font-heading text-xl md:text-2xl tracking-wide text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-white/10"
        >
          <Link
            to="/apply"
            className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-white hover:text-[#b91c1c] transition-colors"
          >
            APPLY NOW →
          </Link>
        </motion.div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-black border-t border-white/10 relative z-10 font-['Barlow',sans-serif]">
        <div className="w-full px-3 sm:px-5 md:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 py-14 md:py-16">
            <div className="flex-shrink-0">
              <img src={FOOTER_LOGO} alt="TACDEV" className="h-16 md:h-20 w-auto object-contain" />
            </div>

            <div className="lg:max-w-xl xl:max-w-2xl">
              <h4 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-4 text-left">
                MISSION
              </h4>
              <p className="text-white/65 text-sm md:text-[15px] leading-relaxed text-left">
                The United States is a maritime nation, and the U.S. Navy protects America at sea.
                Alongside our allies and partners, we defend freedom, preserve economic prosperity
                and keep the seas open and free.
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
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
                Recruitment
              </h4>
              <div className="space-y-3">
                <Link
                  to="/requirements"
                  className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                >
                  Requirements
                </Link>
                <Link
                  to="/apply"
                  className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
                Get in Touch
              </h4>
              <div className="space-y-3">
                <Link
                  to="/faq"
                  className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  to="/career-assessment"
                  className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                >
                  Career Assessment
                </Link>
                <Link
                  to="/inquiries"
                  className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="md:col-span-3 md:col-start-10">
              <h4 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-1">
                Connect
              </h4>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-6">
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.874.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-white/35 text-xs tracking-[0.15em]">© 2026 TACDEV</p>
              <p className="text-white/30 text-[11px] leading-relaxed max-w-3xl text-left md:text-right">
                TACDEV is an independent, fictional Arma 3 community project. We have no connection
                to DEVGRU, the U.S. Navy, JSOC, USSOCOM, or any actual military organization.
                Everything on this site, including names, procedures, structure, branding, and
                content, is purely fictional and created for community purposes.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}