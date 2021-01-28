import React from "react"
import Navbar from "../../components/Navbar"

const Home: React.FC = () => (
    <div className="flex flex-col">
        <Navbar/>
        <div className="flex z-10 text-my-indigo mt-56">
            <div className="ml-48 text-center text-5xl uppercase font-bold">
                Les courts-métrages
            </div>
        </div>
    </div>
)

export default Home