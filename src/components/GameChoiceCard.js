import React from 'react'
import { useNavigate } from 'react-router-dom'

function GameChoiceCard({props}) {
    const { id, type, img, highScore } = props.game


    const navigate = useNavigate()


    return (
        <div
            key={id}
            className='relative flex flex-col items-center text-center h-auto pb-3 m-10 rounded-xl bg-green shadow-sm opacity-70 hover:opacity-100 hover:shadow-2xl hover:shadow-green hover:scale-105'
            onClick={() => navigate(`/${type.split(' ').join('')}`)}
        >
            <h1 className='absolute top-5 md:top-10 text-[20px]'>Guess Against {type}</h1>
            <div className='rounded-xl'>
                <img src={img} className=' md:h-[700px] md:w-[500px] border-4 border-l-black border-b-black object-fit scale-75 rounded-lg' alt='poster' />
            </div>


            <div className='flex flex-col absolute bottom-2 md:bottom-6 text-[18px]'>
                <p className=''>High Score</p>
                <p className=''>{highScore}</p>
            </div>


        </div>
    )
}

export default GameChoiceCard