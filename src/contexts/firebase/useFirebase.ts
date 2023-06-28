import { useContext } from "react";
import Context from "./index";

const useFirebase = () => {
  const context = useContext(Context);
  return context;
};

export default useFirebase;
