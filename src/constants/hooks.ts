import { useEffect, useRef, useState } from "react"
import { setInterval } from "timers"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"

export const useInterval = (callback: () => void, delay: number): void => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay === null) {
            return
        }
        const id = setInterval(() => savedCallback.current(), delay)
        return () => clearInterval(id)
    }, [delay])
}

export const useGATracker = (): void => {
    const location = useLocation()
    const [initialized, setInitialized] = useState<boolean>(false)

    useEffect(() => {
        //Todo: also check for admin pages exclusion
        if (!window.location.href.includes("localhost")) {
            ReactGA.initialize(String(process.env.REACT_APP_GA_TRACKING_ID))
            setInitialized(true)
        }
    }, [])

    useEffect(() => {
        if (initialized) ReactGA.pageview(location.pathname + location.search)
    }, [initialized, location])
}