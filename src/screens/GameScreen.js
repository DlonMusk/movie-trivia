import { collection, doc, orderBy, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectHighScoreRating, selectHighScoreRevenue, selectHighScoreRunTime, setHighScoreRevenue, setHighScoreRating, setHighScoreRunTime, selectUser, selectUsername } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import { useNavigate } from 'react-router-dom'

function GameScreen({ props }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // get data based on props
    const user = useSelector(selectUser)
    const username = useSelector(selectUsername)
    
    const highScoreRating = useSelector(selectHighScoreRating)
    const highScoreRunTime = useSelector(selectHighScoreRunTime)
    const highScoreRevenue = useSelector(selectHighScoreRevenue)

    const [idx, setIdx] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [movieData, setMovieData] = useState(null)
    const [gameStatus, setGameStatus] = useState(true)
    const [displayNewHighScore, setDisplayNewHighScore] = useState(false)

    const [data] = useCollectionOnce(query(collection(db, 'movies'), orderBy('rating')))
    const userDoc = doc(db, 'users', user.uid)


    const handleResetState = () => {
        setIdx(0)
        setGameStatus(true)
        setDisplayNewHighScore(false)
        movieData.sort(() => Math.random() - 0.5)
    }


    useEffect(() => {
        setMovieData(data?.docs?.map(doc => doc.data()).sort(() => Math.random() - 0.5))

        if (props === 'revenue') {
            setHighScore(highScoreRevenue)
        } else if (props === 'rating') {
            setHighScore(highScoreRating)
        } else {
            setHighScore(highScoreRunTime)
        }

    }, [data])


    const maxIdx = movieData?.length - 2



    const setNewHighScore = async (newIdx) => {
        setDisplayNewHighScore(true)
        if (props === 'revenue') {
            await updateDoc(userDoc, {
                highScoreRevenue: newIdx
            })
            dispatch(setHighScoreRevenue(newIdx))

        } else if (props === 'rating') {
            await updateDoc(userDoc, {
                highScoreRating: newIdx
            })
            dispatch(setHighScoreRating(newIdx))

        } else {
            await updateDoc(userDoc, {
                highScoreRunTime: newIdx
            })
            dispatch(setHighScoreRunTime(newIdx))

        }
    }



    const handleLowerClick = (e) => {
        e.preventDefault()
        if (idx === maxIdx) {
            // BEAT THE GAME

        }
        else if (movieData[idx + 1]?.[props] > movieData[idx]?.[props]) {
            if (idx > highScore) {
                setNewHighScore(idx)
            }
            setGameStatus(false)
        } else {
            const newIdx = idx === maxIdx ? 0 : idx + 1
            setIdx(newIdx)
            if (newIdx > highScore) {
                setNewHighScore(newIdx)
                setHighScore(newIdx)
            }
        }
    }

    const handleHigherClick = (e) => {
        e.preventDefault()
        if (idx === maxIdx) {
            // BEAT THE GAME
        }
        // Loss
        else if (movieData[idx + 1]?.[props] < movieData[idx]?.[props]) {
            if (idx > highScore) {
                setNewHighScore(idx)
            }
            setGameStatus(false)
        } else {
            const newIdx = idx === maxIdx ? 0 : idx + 1
            setIdx(newIdx)
            if (newIdx > highScore) {
                setNewHighScore(newIdx)
                setHighScore(newIdx)
            }
        }
    }


    const base_url = 'https://image.tmdb.org/t/p/original';

    const innerHeight = window.innerHeight

    console.log(innerHeight)


    // add a array have the click add to that array have the array render data
    return (
        <div className='overflow-hidden h-screen-ios sm:h-screen'>
            {gameStatus && movieData ? (
                <div className='relative flex flex-col items-center sm:justify-center font-mono mt-5 sm:h-screen'>

                    <div className='flex flex-col items-center sm:items-between sm:mt-10 sm:space-y-[20px]'>
                        <div className='flex flex-col items-center justify-center mb-2 sm:mb-5 h-[275px] w-screen text-[#ffffff40]'>
                            <img className='h-[180px] w-[300px] sm:w-[400px] sm:h-[400px] object-fit rounded-xl shadow-xl shadow-[#000]' src={`${movieData[idx]?.backdrop_path ? base_url + movieData[idx]?.backdrop_path : base_url + movieData[idx]?.poster_path}`} alt='poster' />
                            <h1 className='w-3/4 text-center text-[18px] sm:text-[30px] text-lighttext mt-5'>{movieData[idx]?.title}</h1>
                            <p className='text-[20px] sm:text-[28px] text-lighttext'>{`${props === 'rating' ? `${movieData[idx]?.[props]}/10` : props === 'revenue' ? `${movieData[idx]?.[props].toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0
                            })} USD` : props === 'runtime' ? `${Math.floor(movieData[idx]?.[props] / 60)}H ${movieData[idx]?.[props] % 60}M` : ''}`}</p>
                        </div>

                        <div className='flex flex-col text-center justify-center items-center w-4/5 max-w-3xl sm:h-[85px] bg-[#ffffff1d] rounded-lg shadow-lg shadow-green'>
                            <h3 className='uppercase tracking-[5px] text-lg sm:text-[35px] text-lighttext'>{props} <span className='text-green'>VS</span></h3>
                            <h6 className='sm:text-2xl sm:mt-2 text-green'>Score: {idx} | HighScore: {highScore}</h6>
                        </div>


                        <div className='flex flex-col items-center justify-center mb-5 h-[275px] w-screen space-y-3 text-[#ffffff40]'>
                            <h1 className='w-3/4 text-center text-[18px] sm:text-[30px] text-lighttext'>{movieData[idx + 1]?.title}</h1>
                            {/* <p>{movieData[idx + 1]?.[props]}</p> */}
                            <img className='h-[180px] w-[300px] sm:w-[400px] sm:h-[400px] object-fit rounded-xl shadow-xl shadow-[#000]' src={`${base_url}${movieData[idx + 1]?.backdrop_path ? base_url + movieData[idx + 1]?.backdrop_path : base_url + movieData[idx + 1]?.poster_path}`} alt='poster' />
                        </div>
                    </div>
                    <div className='flex space-x-5 w-3/4 justify-center sm:mt-[30px]'>
                        <button className='p-3 bg-[#ffffff1d] w-[150px] sm:w-[200px] sm:text-2xl rounded-lg hover:shadow-lg hover:shadow-green hover:text-green' onClick={handleLowerClick}>Lower</button>
                        <button className='p-3 bg-[#ffffff1d] w-[150px] sm:w-[200px] sm:text-2xl rounded-lg hover:shadow-lg hover:shadow-green hover:text-green' onClick={handleHigherClick}>Higher</button>
                    </div>
                </div>
            ) : (
                <div className='relative flex flex-col items-center justify-center h-screen font-mono text-lighttext'>
                    <div className='text-[30px] text-center'>
                        {displayNewHighScore && (
                            <div className='mb-5'>
                                <h1 className=''>Congrats {username}, You Achieved a New HighScore of</h1>
                                <h1 className='text-[50px] text-green'>{highScore}</h1>
                            </div>
                        )}
                        <h1>You Have lost</h1>
                        <div className='space-x-10 space-y-5'>
                            <button onClick={() => {
                                handleResetState()
                            }} className='hover:text-green'>PlayAgain</button>
                            <button onClick={() => navigate('/')} className='hover:text-green'>Home</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default GameScreen