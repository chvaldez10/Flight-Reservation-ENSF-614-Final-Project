import React, { createContext, useState, useContext } from "react";

const CreditCardInfoContext = createContext();

export const useCreditDetails = () => useContext(CreditCardInfoContext);

export const CreditCardInfoProvider = ({ children }) => {
  // everything related to credit card info
  const [creditCardInfo, setCreditCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  // update the credit card info
  const updateCreditCardDetails = (key, value) => {
    console.log(`Updating ${key} to:`, value);
    setCreditCardInfo((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  return (
    <CreditCardInfoContext.Provider
      value={{ creditCardInfo, updateCreditCardDetails }}
    >
      {children}
    </CreditCardInfoContext.Provider>
  );
};
