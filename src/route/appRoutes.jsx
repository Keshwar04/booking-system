import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hotel from "../pages/hotel";
import Flight from "../pages/flight";
import Layout from "../components/layout";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/hotels" element={<Hotel />} />
          <Route path="/flights" element={<Flight />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
