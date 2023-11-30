import { useState } from "react";

const usePassengerInfo = () => {
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handlePassengerInfoChange = (updatedInfo) => {
    setPassengerInfo(updatedInfo);
  };

  return {
    passengerInfo,
    handlePassengerInfoChange,
  };
};

export default usePassengerInfo;
