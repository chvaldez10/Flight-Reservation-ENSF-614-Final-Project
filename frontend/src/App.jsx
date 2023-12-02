import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Adjust path as needed
import ProviderWrapper from "./ProviderWrapper"; // Adjust path as needed

const App = () => (
  <ProviderWrapper>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </ProviderWrapper>
);

export default App;
