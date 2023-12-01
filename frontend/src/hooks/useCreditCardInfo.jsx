import { useState } from "react";

const useCreditCardInfo = () => {
  const [creditCardInfo, setCreditCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleCreditCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    creditCardInfo,
    handleCreditCardInfoChange,
  };
};

export default useCreditCardInfo;
