import React from "react"
import Navbar from "../../components/Navbar"
import Film from "../../components/Film"
import {films} from "../../constants"

const Home: React.FC = () => (
    <div className="flex flex-col">
        <Navbar/>
        <div className="flex flex-col z-10 text-my-indigo mt-56">
            <div className="text-center text-5xl uppercase font-bold w-1/2">
                Les courts-métrages
            </div>
            <div className="mt-24 flex flex-row-reverse justify-evenly w-3/5 mx-auto">
                {
                    films.map((film, i) => (
                        <Film key={i} filmName={film.filmName} author={film.author}
                            description={film.description} date={film.date}
                            location={film.location} duration={film.duration}
                            imgThumbnail={film.imgThumbnail} imgExtended={film.imgExtended}/>
                    ))
                }
            </div>
        </div>
    </div>
)

export default Home