import { useState } from "react"
import { ModalContext } from "./ModalContext"

export const ModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [propuestas, setPropuestas] = useState([])

  return (
    <ModalContext.Provider value={{
      isModalVisible, setIsModalVisible, propuestas, setPropuestas
    }}>
      {children}
    </ModalContext.Provider>
  )
}
