import { useEffect, useRef } from "react"
import { setInterval } from "timers"

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