import React, { useState } from "react"
import { useInterval } from "../../constants/hooks"

interface CountdownProps {
    deadline: string
    text: string
}

const Countdown: React.FC<CountdownProps> = ({ deadline, text }) => {
    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)

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
        <div className="w-full text-gray-50 text-6xl p-5 bg-yellow-400">
            <div className="flex justify-center space-x-10">
                <div
                    className="flex flex-col items-center justify-center bg-my-indigo p-2 rounded-lg">
                    {leadingZero(days)}
                    <div className="text-2xl">Jours</div>
                </div>
                <div
                    className="flex flex-col items-center justify-center bg-my-indigo p-2 rounded-lg">
                    {leadingZero(hours)}
                    <div className="text-2xl">Heures</div>
                </div>
                <div
                    className="flex flex-col items-center justify-center bg-my-indigo p-2 rounded-lg">
                    {leadingZero(minutes)}
                    <div className="text-2xl">Minutes</div>
                </div>
                <div
                    className="flex flex-col items-center justify-center bg-my-indigo p-2 rounded-lg">
                    {leadingZero(seconds)}
                    <div className="text-2xl">Secondes</div>
                </div>
            </div>
            <div className="flex justify-center italic text-7xl mt-4">{text}</div>
        </div>
    )
}

export default Countdown