import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails.jsx";

const App = () => (
  <BrowserRouter>
    {/* persistent header */}
    <NavBar />
    {/* page routes */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  </BrowserRouter>
);
export default App;
