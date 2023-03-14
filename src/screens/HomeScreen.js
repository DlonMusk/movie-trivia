import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Nav from '../components/Nav'
import axios from '../dataLayer/axios'
import requests from '../dataLayer/requests'
import GameChoiceCard from '../components/GameChoiceCard'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useSelector } from 'react-redux'
import { selectHighScoreRating, selectHighScoreRevenue, selectHighScoreRunTime, selectUser } from '../dataLayer/slices/userSlice'






function HomeScreen() {

    const revenueHighScore = useSelector(selectHighScoreRevenue)
    const ratingHighScore = useSelector(selectHighScoreRating)
    const runTimeHighScore = useSelector(selectHighScoreRunTime)
    

    const games = [
        {
            id: 0,
            type: 'Rating',
            img: 'https://i.etsystatic.com/13513569/r/il/5e7479/1963385785/il_570xN.1963385785_fsj1.jpg',
            highScore: ratingHighScore
        },
        {
            id: 1,
            type: 'Revenue',
            img: 'https://image.tmdb.org/t/p/original/pxbrFOTV2j8MmZQlfin3dwz5cXV.jpg',
            highScore: revenueHighScore
        },
        {
            id: 2,
            type: 'Run Time',
            img: 'https://preview.redd.it/6w0pwaskp9e61.jpg?width=640&crop=smart&auto=webp&s=ab0bf689b83ed3b6fa6f6ac49478476af95b26eb',
            highScore: runTimeHighScore
        },
    
    ]




    //load database with movies
    // useEffect(() => {
    //     axios.get(requests.fetchMovies).then(movie => {
    //         // const movieCollection = db.collection('movies')
    //         const movieDataArray = movie.data.results
    //         console.log(movieDataArray)
    //         movieDataArray.forEach(movie => {
    //             const { id } = movie

    //             axios.get(requests.fetchDetails(id)).then(movie => {
    //                 const { id, backdrop_path, poster_path, original_title, budget, revenue, runtime, vote_average } = movie.data
                    

    //                 addDoc(collection(db, 'movies'),
    //                     {title: original_title, id: id, backdrop_path: backdrop_path, poster_path: poster_path, budget: budget, revenue: revenue, runtime: runtime, rating: vote_average }
    //                 )
    //                 console.log(original_title, " Added to the database")

    //             }).catch(err => console.error(err))
    //         });
    //     })

        
    // }, [])

    




    return (
        <div
            className='flex flex-col h-screen min-h-screen'
        >
            <Nav />
            {/* Game choice Cards */}
            <div className='flex-1 flex flex-col items-center 2xl:flex-row 2xl:justify-center bg-[#202124]'>
                {games.map(game => (
                    <GameChoiceCard props={{game}} key={game.id} />
                ))}

            </div>
        </div>
    )
}

export default HomeScreen