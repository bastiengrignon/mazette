import React, { useState } from "react"
import { useInterval } from "../../constants/hooks"


interface CountdownProps {
    deadline: string
    text: string
    invertColor?: boolean
}

const Countdown: React.FC<CountdownProps> = ({ deadline, text, invertColor }) => {
    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)

    const countdownNumberCSS = `flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg ${invertColor ? "bg-red" : "bg-green"}`

    const leadingZero = (number: number): string | number => {
        return number < 10 ? "0" + number : number
    }

    const getTimeUntil = (deadline: string): void => {
        const currentDate = new Date()
        const targetDate = new Date(deadline)
        const diff = targetDate.getTime() - currentDate.getTime()
        if (diff < 0) {
            setDays(0)
            setHours(0)
            setMinutes(0)
            setSeconds(0)
            return
        }
        setSeconds(Math.floor((diff / 1000) % 60))
        setMinutes(Math.floor((diff / 1000 / 60) % 60))
        setHours(Math.floor((diff / (1000 * 60 * 60)) % 24))
        setDays(Math.floor(diff / (1000 * 60 * 60 * 24)))
    }

    useInterval(() => getTimeUntil(deadline), 1000)

    return (
        <div
            className={`w-full ${invertColor ? "text-white" : "text-white"} text-lg sm:text-2xl md:text-4xl lg:text-6xl p-2 ${invertColor
                ? "bg-green" : "bg-red"}`}>
            <div className="flex justify-center space-x-1 sm:space-x-5 md:space-x-10">
                <div
                    className={countdownNumberCSS}>
                    {leadingZero(days)}
                    <div className="text-base sm:text-xl md:text-2xl">Jours</div>
                </div>
                <div
                    className={countdownNumberCSS}>
                    {leadingZero(hours)}
                    <div className="text-base sm:text-xl md:text-2xl">Heures</div>
                </div>
                <div
                    className={countdownNumberCSS}>
                    {leadingZero(minutes)}
                    <div className="text-base sm:text-xl md:text-2xl">Minutes</div>
                </div>
                <div
                    className={countdownNumberCSS}>
                    {leadingZero(seconds)}
                    <div className="text-base sm:text-xl md:text-2xl">Secondes</div>
                </div>
            </div>
            <div
                className={"flex justify-center italic text-xl sm:text-4xl md:text-5xl mt-4 text-white"}>
                {text}
            </div>
        </div>
    )
}

export default Countdown