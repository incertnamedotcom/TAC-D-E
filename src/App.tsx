import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Navbar from "./components/navbar";
import Careers from "./pages/careers";
import Videos from "./pages/videos";
import Gallery from "./pages/gallery";
import About from "./pages/about";
import Apply from "./pages/Apply";
import NavyCareers from "./pages/careers/navy";
import AirForceCareers from "./pages/careers/airforce";
import ArmyCareers from "./pages/careers/army";

// Detail Pages
import NavySeal from "./pages/careers/navy/seal";
import NavyEod from "./pages/careers/navy/eod";
import NavyCorpsman from "./pages/careers/navy/corpsman";
import AirForceCct from "./pages/careers/airforce/cct";
import AirForcePj from "./pages/careers/airforce/pj";
import ArmySpecialAviator from "./pages/careers/army/special-aviator";

// New Pages
import Requirements from "./pages/Requirements";
import FAQ from "./pages/FAQ";
import CareerAssessment from "./pages/CareerAssessment";
import HowToJoin from "./pages/HowToJoin";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Apply />} />

            {/* New Routes */}
            <Route path="/how-to-join" element={<HowToJoin />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/career-assessment" element={<CareerAssessment />} />

            {/* Navy Sub Pages */}
            <Route path="/careers/navy" element={<NavyCareers />} />
            <Route path="/careers/navy/seal" element={<NavySeal />} />
            <Route path="/careers/navy/eod" element={<NavyEod />} />
            <Route path="/careers/navy/corpsman" element={<NavyCorpsman />} />

            {/* Air Force Sub Pages */}
            <Route path="/careers/airforce" element={<AirForceCareers />} />
            <Route path="/careers/airforce/cct" element={<AirForceCct />} />
            <Route path="/careers/airforce/pj" element={<AirForcePj />} />

            {/* Army Sub Page */}
            <Route path="/careers/army" element={<ArmyCareers />} />
            <Route path="/careers/army/special-aviator" element={<ArmySpecialAviator />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}