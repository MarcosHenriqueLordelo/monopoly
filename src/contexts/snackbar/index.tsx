import React, { createContext, useState } from "react";

interface SnackbarContext {
  showSnackbar: (message: string, color: string) => void;
  message?: string;
  color?: string;
  clearMessage: () => void;
}

const SnackbarContext = createContext<SnackbarContext>({} as SnackbarContext);

export const SnackbarProvider: React.FC<DefaultProps> = ({ children }) => {
  const [message, setMessage] = useState<string>();
  const [color, setColor] = useState<string>();

  const showSnackbar = (message: string, color: string) => {
    setMessage(message);
    setColor(color);
  };

  const clearMessage = () => setMessage(undefined);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        message,
        color,
        clearMessage,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
