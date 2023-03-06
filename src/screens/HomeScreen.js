import React from 'react'
import { auth } from '../firebase'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Nav from '../components/Nav'
import axios from '../dataLayer/axios'
import requests from '../dataLayer/requests'
import GameChoiceCard from '../components/GameChoiceCard'


const games = [
    {
        id: 0,
        type: 'Rating',
        img: 'https://i.etsystatic.com/13513569/r/il/5e7479/1963385785/il_570xN.1963385785_fsj1.jpg'
    },
    {
        id: 1,
        type: 'Revenue',
        img: 'https://image.tmdb.org/t/p/original/pxbrFOTV2j8MmZQlfin3dwz5cXV.jpg'
    },
    {
        id: 2,
        type: 'Run Time',
        img: 'https://preview.redd.it/6w0pwaskp9e61.jpg?width=640&crop=smart&auto=webp&s=ab0bf689b83ed3b6fa6f6ac49478476af95b26eb'
    },

]

function HomeScreen() {

    // axios.get(requests.fetchMovies).then(movie => {
    //     console.log(movie)
    // })



    return (
        <div
            className='flex flex-col h-screen min-h-screen'
        >
            <Nav />
            {/* Game choice Cards */}
            <div className='flex-1 flex flex-col items-center 2xl:flex-row 2xl:justify-center bg-soft'>
                    {games.map(game => (
                        <GameChoiceCard props={game} key={game.id} />
                    ))}

                </div>
        </div>
    )
}

export default HomeScreen