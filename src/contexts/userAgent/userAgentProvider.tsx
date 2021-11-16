import { useUserAgent } from "next-useragent"
import { UserAgentContext } from "./userAgentContext"

export interface ProviderProps {
  children?: React.ReactNode
  uaString: string
}

export const UserAgentContextProvider = ({
  children,
  uaString,
}: ProviderProps): JSX.Element => {
  const isMobile = useUserAgent(uaString).isMobile

  return (
    <UserAgentContext.Provider value={{ isMobile }}>
      {children}
    </UserAgentContext.Provider>
  )
}
