import React, {useEffect, useState} from "react"

interface WaveProps {
    className?: string
    text: string
    textAlignement?: "text-after-edge" | "inherit" | "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | undefined
    textColor?: string
    fillColor?: string
}

const Wave: React.FC<WaveProps> = ({
    className,
    text,
    textAlignement= "text-after-edge",
    textColor = "#ffffff",
    fillColor = "#098c9a"
}) => {
    const [cssColor, setCssColor] = useState<boolean>(false)

    useEffect(() => {
        const colorRegex = /^#[0-9a-f]{3,8}$/im
        if (colorRegex.test(fillColor)) setCssColor(true)
    }, [fillColor])

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 310"
            style={{zIndex: -1, color: cssColor ? fillColor : ""}}
            className={`absolute ${className} ${cssColor ? "" : fillColor}`}>
            <path fill="currentColor" id="wave"
                d="M0,0V211.26q0,6.41,0,12.4c0,13.92,0,28.74,0,43.14v8.57c9.76-7.1,21.87-10.26,33.55-13a5.13,5.13,0,0,1,1.31-.36,5.1,5.1,0,0,1,1.42-.39,5.64,5.64,0,0,1,.85-.28H37c21-6,42-12,64.45-16q5.17-1,10.38-2a912.42,912.42,0,0,1,93.76-12.84q5.37-.56,10.76-1c3.6-.27,7.2-.49,10.82-.63,2.69-.3,5.37-.58,8.06-.84q12.12-1.15,24.31-1.71a462.2,462.2,0,0,1,116.08,9.49c39.2,8.3,77.17,21.77,115.26,34,19.36,6.21,38.77,12.28,58.39,17.61,9.62,2.61,19.29,5.05,29,7.23q7.76,1.72,15.58,3.09c4,.7,9.82.49,13.51,2.11l3.24.38q3.35.38,6.69.71,7.74.75,15.49,1.23,14.18.87,28.38.82A530.14,530.14,0,0,0,719,299.53q4.26-.48,8.5-1l.79-.1c4.43-.85,9-1.28,13.43-2,9.62-1.5,19.22-3.18,28.79-5,19.56-3.67,39-7.82,58.49-12.06,41.26-9,82.54-17.37,124.71-20.85A480.3,480.3,0,0,1,1068,263c14.85,1.53,29.41,4.72,43.85,8.51,32.27,7.22,64.17,16.07,96.19,24.39l10.68,2.75c2.54.59,5.09,1.21,7.65,1.83,3,.66,5.9,1.34,8.87,2,31.81,9.92,65.81,6.92,98.42,6.89,2.85,0,5.7,0,8.56,0,5.71-.07,11.42-.23,17.14-.54H1366V0Z"/>
            <text className="w-auto" x="600" dy="-20" fontFamily="Verdana">
                <textPath alignmentBaseline={textAlignement} xlinkHref="#wave" textLength="750" wordSpacing="25" fontSize="1.2rem"
                    fill={textColor}>
                    {text}
                </textPath>
            </text>
        </svg>
    )
}

export default Wave
