import React from "react"
import { FaCircleNotch } from "react-icons/fa"

const Loading: React.FC = () => (
    <div className="flex items-center justify-center">
        <FaCircleNotch className="animate-spin"/>
    </div>
)

export default Loading