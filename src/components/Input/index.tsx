import React from "react"

interface InputProps {
    required?: boolean
    onChange: (value: string) => void
    type?: "text" | "email" | "password" | "number"
    className?: string
    placeholder?: string
    name?: string
}

const Input: React.FC<InputProps> = ({required = false, onChange, type = "text", className, ...others}) => (
    <input type={type} required={required} {...others}
        onChange={({target: {value}}) => onChange(value)}
        className={`border border-gray-300 text-base rounded focus:border focus:outline-none focus:border-my-indigo px-0.5 mt-1.5 w-4/6 lg:w-1/2 ${className}`}/>
)

export default Input