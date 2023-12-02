import React, { createContext, useState } from "react";

export const SeatPricingContext = createContext();

export const SeatPricingProvider = ({ children }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatPrice, setSeatPrice] = useState(0);

  const updateSeatInfo = (seat, price) => {
    setSelectedSeat(seat);
    setSeatPrice(price);
  };

  return (
    <SeatPricingContext.Provider
      value={{ selectedSeat, seatPrice, updateSeatInfo }}
    >
      {children}
    </SeatPricingContext.Provider>
  );
};
