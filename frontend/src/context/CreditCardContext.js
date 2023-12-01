import React, { createContext, useState, useContext } from "react";

const CreditCardInfoContext = createContext();

export const useCreditDetails = () => useContext(CreditCardInfoContext);

export const CreditCardInfoProvider = ({ children }) => {
  const [creditCardInfo, setCreditCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const updateCreditCardDetails = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo((prevDetails) => ({
      ...prevDetails,
      [name]: value,
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
