import React, { createContext, useState, useContext } from "react";

const SelectedSeatContext = createContext();

export const useSelectedSeat = () => useContext(SelectedSeatContext);

export const SelectedSeatProvider = ({ children }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const selectSeat = (seatNumber) => {
    setSelectedSeat(selectedSeat === seatNumber ? null : seatNumber);
  };

  return (
    <SelectedSeatContext.Provider value={{ selectedSeat, selectSeat }}>
      {children}
    </SelectedSeatContext.Provider>
  );
};
