import { useEffect, useRef, useState } from "react"
import { setInterval } from "timers"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"

import { CookieService } from "../services/common/cookie.services"

export const useInterval = (callback: () => void, delay: number): void => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay === null) return
        const id = setInterval(() => savedCallback.current(), delay)
        return () => clearInterval(id)
    }, [delay])
}

export const useGATracker = (): void => {
    const location = useLocation()
    const initialized = CookieService.isCookiesAllowed()

    useEffect(() => {
        ReactGA.initialize(String(process.env.REACT_APP_GA_TRACKING_ID))
    }, [])

    useEffect(() => {
        if (initialized) {
            ReactGA.pageview(location.pathname + location.search)
        }
    }, [initialized, location])
}

interface useModalProps {
    isOpen: boolean
    toggle: () => void
}

const useModal = (): useModalProps  => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggle = (): void => setIsOpen(!isOpen)
    return { isOpen, toggle }
}

export default useModal