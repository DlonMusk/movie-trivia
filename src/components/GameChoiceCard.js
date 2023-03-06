import React from 'react'

function GameChoiceCard({ props }) {
    const { id, type, img } = props

    const goToGame = () => {
        console.log('WORKING')
    }


    return (
        <div
            key={id}
            className='relative flex flex-col items-center text-center h-auto m-10 rounded-xl bg-lightgreen shadow-sm opacity-70 hover:opacity-100 hover:shadow-2xl hover:scale-105'
            onClick={goToGame}
        >
            <h1 className='absolute top-5 md:top-10'>Guess Against {type}</h1>
            <div className='rounded-xl'>
                <img src={img} className=' md:h-[700px] md:w-[500px] border-4 border-l-black border-b-black object-fit scale-75 rounded-lg' alt='poster'></img>
            </div>


            <div className='flex flex-col absolute bottom-2 md:bottom-5'>
                <p className=''>High Score</p>
                <p className=''>10</p>
            </div>


        </div>
    )
}

export default GameChoiceCard