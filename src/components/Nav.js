import React, { useState } from 'react'
import { FaUserCog } from 'react-icons/fa'
import { BiMoviePlay, BiLogOut } from 'react-icons/bi'
import { MdOutlineDarkMode, MdOutlineLeaderboard } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { logout, selectUsername } from '../dataLayer/slices/userSlice'
import { useSelector } from 'react-redux'

function Nav() {

    const [options, setOptions] = useState(false)
    const username = useSelector(selectUsername)

    const navigate = useNavigate()


    return (
        <div className='sticky z-[10] top-0 w-screen bg-green py-5'>
            <div className='flex relative justify-between items-center xl:max-w-[100rem] mx-5 xl:mx-auto xl:px-5'>
                <div className='flex flex-col items-end'>
                    <button onClick={() => navigate('/')} className='flex space-x-3 items-center'>
                        <BiMoviePlay className='h-8 w-8' />
                        <h1 className='font-extrabold'>Movie Vs Trivia</h1>
                    </button>

                    <h1 className='font-bold'>Welcome {username}</h1>
                </div>

                <button
                    className='font-semibold flex items-center space-x-3'
                    onClick={() => setOptions(!options)}
                >
                    <span className='hidden sm:inline-flex'>Options</span>
                    <FaUserCog className='h-6 w-6 ml-3' />
                </button>


                <AnimatePresence>
                    {options && (
                        <motion.div
                            className='absolute flex flex-col items-center right-3 top-10 fit bg-black'
                        >
                            <button
                                exit={{ opacity: 0 }}
                                className='flex w-36 h-14 items-center justify-between text-white p-2 hover:bg-lightgreen focus:border focus:border-black'
                                onClick={() => {
                                    logout()
                                    auth.signOut()
                                }}
                            >
                                Sign Out
                                <BiLogOut className='text-white ml-4 h-6 w-6' />
                            </button>
                            <button
                                exit={{ opacity: 0 }}
                                className='flex w-36 h-14 items-center justify-between text-white p-2 hover:bg-lightgreen focus:border focus:border-black'
                                onClick={() => navigate('/leaderboard')}
                            >
                                Leaderboard
                                <MdOutlineLeaderboard className='text-white ml-4 h-6 w-6' />
                            </button>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Nav