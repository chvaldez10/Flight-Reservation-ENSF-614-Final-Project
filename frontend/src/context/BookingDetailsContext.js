import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const BookingDetailsContext = createContext();

export const useBookingDetails = () => useContext(BookingDetailsContext);

export const BookingDetailsProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    BookingID: null,
    FlightID: null,
    SeatLetter: null,
    SeatNum: null,
    FName: "",
    LName: "",
    Email: "",
  });

  const updateBookingDetail = (key, value) => {
    console.log(`Updating ${key} to`, value);
    setBookingDetails((prevDetails) => ({ ...prevDetails, [key]: value }));
  };

  const updateBookingDetails = (details) => {
    console.log("Updating booking details:", details);
    setBookingDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  const submitBookingDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/passengers",
        bookingDetails
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting booking details:", error);
    }
  };

  return (
    <BookingDetailsContext.Provider
      value={{
        bookingDetails,
        updateBookingDetail,
        updateBookingDetails,
        submitBookingDetails,
      }}
    >
      {children}
    </BookingDetailsContext.Provider>
  );
};
