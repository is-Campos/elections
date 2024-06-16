import { useState } from "react"
import {VotosContext} from "./VotosContext"

export const VotosProvider = ({ children }) => {
  const [votos, setVotos] = useState([]);

  return (
    <VotosContext.Provider value={{
      votos, setVotos
    }}>
      {children}
    </VotosContext.Provider>
  )
}
