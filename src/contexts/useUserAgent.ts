import { useContext } from "react";
import { UserAgentContext } from "./userAgentContext";

export type UserViewStatus = {
  isMobile: boolean;
};

export const useUserAgent = (): UserViewStatus => useContext(UserAgentContext);
