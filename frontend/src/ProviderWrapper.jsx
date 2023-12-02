import React from "react";
import AuthProvider from "./context/AuthContext";
import { BookingDetailsProvider } from "./context/BookingDetailsContext";
import { CreditCardInfoProvider } from "./context/CreditCardContext";
import { SeatPricingProvider } from "./context/SeatPricingContext";

const ProviderWrapper = ({ children }) => (
  <AuthProvider>
    <BookingDetailsProvider>
      <CreditCardInfoProvider>
        <SeatPricingProvider>{children}</SeatPricingProvider>
      </CreditCardInfoProvider>
    </BookingDetailsProvider>
  </AuthProvider>
);

export default ProviderWrapper;
