//
// Alert related code based on this article:
//
//   https://dev.to/jeffreythecoder/set-up-react-global-alert-popup-in-10mins-36l3
//

import { AlertColor } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ALERT_TIME = 2500;
const initialState = {
  text: "",
  type: "",
};

const AlertContext = createContext({
  ...initialState,
  setAlert: (text: string, type: AlertColor) => {},
});

type Props = {
  children: JSX.Element;
};

export const AlertProvider = ({ children }: Props) => {
  const [text, setText] = useState<string>("");
  const [type, setType] = useState<string>("");
  const setAlert = (text: string, type: AlertColor) => {
    setText(text);
    setType(type);
    setTimeout(() => {
      setText("");
      setType("");
    }, ALERT_TIME);
  };
  return (
    <AlertContext.Provider value={{ text, type, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

export default AlertContext;
