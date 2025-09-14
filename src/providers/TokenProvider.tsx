import { TokenContext } from 'contexts/TokenContext'

import React, { useState } from 'react'

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(
    import.meta.env.VITE_GITHUB_TOKEN || ''
  )

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export { TokenContext }

