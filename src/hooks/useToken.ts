import { useContext } from "react"

import { TokenContext } from "providers/TokenProvider"

export const useToken = () => useContext(TokenContext)
