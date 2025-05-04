import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Faculty from "./pages/Faculty";
import Course from "./pages/Course";
import Department from "./pages/Department";
import Enrollment from "./pages/Enrollment";
import Student from "./pages/Student";
import Program from "./pages/Program";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/course" element={<Course />} />
        <Route path="/department" element={<Department />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/student" element={<Student />} />
        <Route path="/program" element={<Program />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
