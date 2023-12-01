import React, { createContext, useState, useContext } from "react";

const BookingDetailsContext = createContext();

export const useBookingDetails = () => useContext(BookingDetailsContext);

export const BookingDetailsProvider = ({ children }) => {
  // context for booking details
  const [bookingDetails, setBookingDetails] = useState({
    flightId: null,
    flightCost: null,
    selectedSeat: null,
  });

  // update individual booking details
  const updateBookingDetail = (key, value) => {
    console.log(`Updating ${key} to`, value); // logging for easy debugging
    setBookingDetails((prevDetails) => ({ ...prevDetails, [key]: value }));
  };

  // update multiple booking details at once
  const updateBookingDetails = (details) => {
    console.log("Updating booking details:", details); // Debugging log
    setBookingDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  return (
    <BookingDetailsContext.Provider
      value={{ bookingDetails, updateBookingDetail, updateBookingDetails }}
    >
      {children}
    </BookingDetailsContext.Provider>
  );
};
