import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
