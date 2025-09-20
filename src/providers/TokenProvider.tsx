import React, { useState } from "react"

import { TokenContext } from "contexts/TokenContext"

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(import.meta.env.VITE_GITHUB_TOKEN || "")

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export { TokenContext }
