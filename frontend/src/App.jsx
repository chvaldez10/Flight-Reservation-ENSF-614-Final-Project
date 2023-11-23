// Importing BrowserRouter, Routes, and Route from react-router-dom for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing page components
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";
import Admin from "./pages/admin/Admin";

// App component that defines the routing structure for the application
function App() {
  return (
    // BrowserRouter wraps the Routes component to enable routing
    <BrowserRouter>
      {/* Routes component where different Route components are defined */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the flights list page */}
        <Route path="/flights" element={<List />} />

        {/* Route for individual flight details, using a dynamic segment :id */}
        <Route path="/flights/:id" element={<Flight />} />

        {/* Route for the admin page */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exporting the App component for use in the application
export default App;
