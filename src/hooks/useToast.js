import { useState } from "react";

const useToast = () => {
  const [toast, setToast] = useState({
    open: false,
    status: "info",
    title: "",
    description: "",
  });

  const handleSetToast = (toast) => {
    setToast(toast);
  };

  const handleCloseToast = () => {
    setToast({
      open: false,
      status: "info",
      title: "",
      description: "",
    });
  };

  return { toast, handleSetToast, handleCloseToast };
};

export default useToast;
