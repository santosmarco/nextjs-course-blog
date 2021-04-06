import { createContext } from "react";

const APP_INFO = {
  name: "Next Auth",
};

export const AppInfoCtx = createContext(APP_INFO);

export const AppInfoProvider: React.FC = ({ children }) => {
  return <AppInfoCtx.Provider value={APP_INFO}>{children}</AppInfoCtx.Provider>;
};
