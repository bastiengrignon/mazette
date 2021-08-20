import { useState } from "react"

interface useModalProps {
    isOpen: boolean
    toggle: () => void
}

const useModal = (): useModalProps  => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const toggle = (): void => {
        setIsOpen(!isOpen)
    }
    return { isOpen, toggle }
}

export default useModal