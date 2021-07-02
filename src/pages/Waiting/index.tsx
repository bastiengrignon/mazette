import React from "react"

const Waiting: React.FC = () => {

    return (
        <div className="bg-test-green h-screen w-full flex flex-col items-center justify-center text-white space-y-10">
            <img src={`${process.env.PUBLIC_URL}/img/test_logo11.png`} alt="Logo Mazette"
                className="object-contain h-auto w-3/4 sm:w-1/2 lg:w-1/2"/>
            <div className="text-xl sm:text-2xl md:text-5xl animate-pulse">Le site n&apos;est pas encore disponible </div>
        </div>
    )
}

export default Waiting