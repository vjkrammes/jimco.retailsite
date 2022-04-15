import { Alert, AlertColor } from "@mui/material";
import { useAlert } from "../../Contexts/AlertContext";

function getSeverity(sev: string): AlertColor {
  switch (sev) {
    case "success":
      return "success";
    case "info":
      return "info";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      throw new Error(`${sev} is not a valid AlertColor`);
  }
}

const AlertPopup = () => {
  const { text, type } = useAlert();
  if (text && type) {
    return (
      <Alert
        severity={getSeverity(type)}
        sx={{
          position: "absolute",
          alignItems: "center",
          right: "10px",
          top: "10px",
          backgroundColor: "hsl(150 90% 16%)",
          color: "hsl(165 100% 94%)",
          fontSize: "1.25rem",
          lineHeight: "2rem",
          boxShadow: "3px 3px 5px hsl(164 100% 6%)",
        }}>
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
