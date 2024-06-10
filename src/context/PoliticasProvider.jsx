import { useState } from "react"
import {PoliticasContext} from "./PoliticasContext"

export const PoliticasProvider = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <PoliticasContext.Provider value={{
      checked, setChecked, isDialogVisible, setIsDialogVisible
    }}>
      {children}
    </PoliticasContext.Provider>
  )
}
