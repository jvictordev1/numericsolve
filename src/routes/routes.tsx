import Navbar from "@/components/Navbar";
import Equations from "@/pages/Equations";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <section className="pt-24 md:pt-32">
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="equations" element={<Equations />} />
        </Routes>
      </section>
    </Router>
  );
}
