import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCog } from 'react-icons/fa'
import { BiMoviePlay, BiLogOut } from 'react-icons/bi'
import { MdOutlineDarkMode } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'

function Nav() {

    const [options, setOptions] = useState(false)


    return (
        <div className='sticky z-[10] top-0 w-screen bg-green dark:bg-lightgreen py-5'>
            <div className='flex relative justify-between items-center max-w-[100rem] mx-5 md:mx-auto'>
                <div className='flex space-x-3 items-center'>
                    <BiMoviePlay className='h-8 w-8' />
                    <h1 className=' font-extrabold'>Movie Vs Trivia</h1>
                </div>
                <button
                    className='font-semibold flex items-center space-x-3'
                    onClick={() => setOptions(!options)}
                >
                    Options
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
                            >
                                Sign Out
                                <BiLogOut className='text-white ml-4 h-6 w-6' />
                            </button>
                            <button
                                exit={{ opacity: 0 }}
                                className='flex w-36 h-14 items-center justify-between text-white p-2 hover:bg-lightgreen focus:border focus:border-black' 
                            >
                                Dark Mode
                                <MdOutlineDarkMode className='text-white ml-4 h-6 w-6' />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Nav