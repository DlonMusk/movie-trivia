import { collection, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectHighScoreRating, selectHighScoreRevenue, selectHighScoreRunTime, selectUser } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'
import { useCollection, useCollectionOnce } from "react-firebase-hooks/firestore"
import { AnimatePresence, motion } from 'framer-motion'
import Nav from '../components/Nav'

function GameScreen({ props }) {

    // get data based on props
    const user = useSelector(selectUser)
    const [gameStatus, setGameStatus] = useState(true)
    const highScoreRating = useSelector(selectHighScoreRating)
    const highScoreRunTime = useSelector(selectHighScoreRunTime)
    const highScoreRevenue = useSelector(selectHighScoreRevenue)


    console.log(props)


    const [idx, setIdx] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [movieData, setMovieData] = useState(null)

    const [data, _, x] = useCollectionOnce(query(collection(db, 'movies'), orderBy('rating')))







    useEffect(() => {
        setMovieData(data?.docs?.map(doc => doc.data()).sort(() => Math.random() - 0.5))

        if (props === 'revenue') {
            setHighScore(highScoreRevenue)
        } else if (props === 'rating') {
            setHighScore(highScoreRating)
        } else {
            console.log("working")
            setHighScore(highScoreRunTime)
        }

    }, [data])












    const maxIdx = movieData?.length - 2

    console.log(highScore)

    const setNewHighScore = () => {
        if (props === 'revenue') {
            if(idx > highScore){
                
            }
        } else if (props === 'rating') {
            setHighScore(highScoreRating)
        } else {
            console.log("working")
            setHighScore(highScoreRunTime)
        }
    }



    const handleLowerClick = (e) => {
        e.preventDefault()
        if (idx === maxIdx) {
            // BEAT THE GAME

        }
        else if (movieData[idx + 1]?.[props] > movieData[idx]?.[props]) {
            setGameStatus(false)
            setIdx(0)
        } else {
            const newIdx = idx === maxIdx ? 0 : idx + 1
            console.log(idx)
            setIdx(newIdx)
        }
    }

    const handleHigherClick = (e) => {
        e.preventDefault()
        if (idx === maxIdx) {
            // BEAT THE GAME
        }
        else if (movieData[idx + 1]?.[props] < movieData[idx]?.[props]) {
            setGameStatus(false)
            setIdx(0)
        } else {
            const newIdx = idx === maxIdx ? 0 : idx + 1
            console.log(idx + 1)
            setIdx(newIdx)
        }
    }





    const base_url = 'https://image.tmdb.org/t/p/original';
    const animateDistance = window.screen.height / 2


    // add a array have the click add to that array have the array render data
    return (
        <motion.div
            // animate={{y: animateDistance}}
            // transition={{duration: 5}}
            className='relative flex flex-col justify-evenly items-center overflow-hidden h-screen '>
            <Nav />
            {gameStatus && movieData && (
                <>
                    <div className='flex flex-col items-center h-[300px] w-screen '>
                        <img className='h-4/5 w-4/5 object-contain p-3 rounded-xl' src={`${movieData[idx]?.backdrop_path ? base_url + movieData[idx]?.backdrop_path : base_url + movieData[idx]?.poster_path}`} alt='poster' />
                        <h1>{movieData[idx]?.title}</h1>
                        <p>{`${movieData[idx]?.[props]}${props === 'rating' ? '/10' : props === 'revenue' ? ' USD' : ''}`}</p>
                    </div>


                    <div className='absolute flex justify-center items-center w-4/5 h-[3px] bg-white'>
                        <h3 className='uppercase'>{props} VS</h3>
                    </div>


                    <div className='flex flex-col items-center h-[300px] w-screen '>
                        <h1>{movieData[idx + 1]?.title}</h1>
                        <p>{movieData[idx + 1]?.[props]}</p>
                        <img className='h-4/5 w-4/5 object-contain p-3 rounded-xl' src={`${base_url}${movieData[idx + 1]?.backdrop_path ? base_url + movieData[idx + 1]?.backdrop_path : base_url + movieData[idx + 1]?.poster_path}`} alt='poster' />

                        <div className='flex space-x-5 w-3/4 justify-center'>
                            <button className='p-4 bg-lightgreen w-[150px] rounded-lg' onClick={handleLowerClick}>Lower</button>
                            <button className='p-4 bg-lightgreen w-[150px] rounded-lg' onClick={handleHigherClick}>Higher</button>
                        </div>

                    </div>
                </>
            )}

        </motion.div>
    )
}

export default GameScreen