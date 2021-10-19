import React, { useEffect, useState } from 'react'

interface NotificationProps {
    text: string
    timeout?: number
}

const Notification: React.FC<NotificationProps> = ({ text, timeout = 5000 }) => {
    const [visibility, setVisibility] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => setVisibility(false), timeout)
        return () => clearTimeout(timer)
    }, [visibility, timeout])

    return <div className={ `${ visibility ? 'flex' : 'hidden' }` }>{ text }</div>
}

export default Notification