import { FC } from "react"

interface Modal {
  children: React.ReactNode
  isOpen: FC,
  onClose: FC
}

export const Modal = ({children} : Modal) => {
  return (
    <div>
        {children}
    </div>
  )
}
