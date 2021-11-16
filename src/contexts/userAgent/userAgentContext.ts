import { createContext } from "react"
import { UserViewStatus } from "./useUserAgent"

export const UserAgentContext = createContext<UserViewStatus>({
  isMobile: false,
})
