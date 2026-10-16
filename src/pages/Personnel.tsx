import { Link } from "react-router-dom";
import { useState } from "react";

export default function Personnel() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      
      {/* Top Logo */}
      <div className="w-full">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center">
          <Link to="/">
            <img 
              src="https://i.imgur.com/xEtxsCw.png" 
              alt="TACDEV" 
              className="h-14 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-[400px]">
          
          {/* Login Card */}
          <div className="relative bg-[#111111] border border-zinc-800/80 overflow-hidden">
            
            {/* Subtle greyed-out seal in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <img 
                src="https://i.imgur.com/xEtxsCw.png" 
                alt="" 
                className="w-64 h-64 object-contain opacity-[0.04] select-none"
              />
            </div>

            {/* Header */}
            <div className="relative px-8 pt-10 pb-8 text-center border-b border-zinc-800/80">
              <p className="text-[10px] tracking-[0.28em] text-white/40 uppercase mb-3">
                Naval Special Warfare
              </p>
              <h1 className="text-sm font-medium tracking-[0.18em] text-white uppercase mb-8">
                Personnel Login System
              </h1>
              
              <h2 className="text-xl font-medium tracking-wide text-white">
                Sign In
              </h2>
              <p className="text-[13px] text-white/40 mt-2 leading-relaxed">
                Use the credentials assigned to your account.
              </p>
            </div>

            {/* Form */}
            <div className="relative px-8 py-8">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                
                {/* Email */}
                <div>
                  <label className="block text-[10px] tracking-[0.18em] text-white/45 uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-[#0a0a0a] border border-zinc-700/80 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10px] tracking-[0.18em] text-white/45 uppercase mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-[#0a0a0a] border border-zinc-700/80 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-zinc-500 transition-colors pr-16"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] tracking-wider text-white/35 hover:text-white/60 uppercase transition-colors"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-zinc-200 text-black font-medium text-sm tracking-[0.18em] uppercase py-3.5 transition-colors duration-200 mt-3"
                >
                  Sign In
                </button>
              </form>

              <p className="text-[11px] text-white/25 text-center mt-8 leading-relaxed">
                Authorized personnel only.<br />
                Accounts are provisioned by unit administration.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}