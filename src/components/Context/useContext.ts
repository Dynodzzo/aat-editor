import { useContext } from "react";
import { AppContext, AppDispatchContext } from "./Context";

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useAppDispatch = () => {
  return useContext(AppDispatchContext);
};
