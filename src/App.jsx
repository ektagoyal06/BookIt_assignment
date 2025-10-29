import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import AddExperience from "./components/AddExperience";
import BookingSuccess from "./pages/BookingSuccess";
import ExperienceDetails from "./components/ExperienceDetails"; // ✅ new import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-experience" element={<AddExperience />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/experience/:id" element={<ExperienceDetails />} /> {/* ✅ new route */}
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
