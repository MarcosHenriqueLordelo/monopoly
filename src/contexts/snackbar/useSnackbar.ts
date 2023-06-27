import { useContext } from "react";
import Context from "./index";

const useSnackbar = () => {
  const context = useContext(Context);
  return context;
};

export default useSnackbar;
