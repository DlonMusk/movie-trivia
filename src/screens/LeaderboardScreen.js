import { collection, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import Nav from '../components/Nav'
import { db } from '../firebase'

function LeaderboardScreen() {

    const [userScores, setUserScores] = useState(null)

    const [data] = useCollectionOnce(collection(db, 'users'))


    useEffect(() => {
        setUserScores(data?.docs?.map(doc => doc.data()).sort((a, b) => {
            const maxA = Math.max(a.highScoreRating, a.highScoreRevenue, a.highScoreRunTime);
            const maxB = Math.max(b.highScoreRating, b.highScoreRevenue, b.highScoreRunTime);
            return maxB - maxA;
        }))
    }, [data])
    
    

  return (
    <div className='flex flex-col h-screen items-center bg-black'>
        <Nav />
        <h1 className='uppercase text-white mt-10 text-[25px] tracking-[5px]'>Leaderboard</h1>
        <div className='overflow-y-scroll flex justify-center h-auto w-[20rem] mt-5 scrollbar-none'>
            <ul>
                {userScores?.map((user, idx) => (
                    <div key={idx} className='flex flex-col space-3 m-5 text-white font-mono tracking-[3px]'>
                        <h1 className='mb-2 border-b-white border-b-2'>#{idx + 1} {user.username}</h1>
                        <p>Rating: {user.highScoreRating}</p>
                        <p>Revenue: {user.highScoreRevenue}</p>
                        <p>RunTime: {user.highScoreRunTime}</p>
                    </div>
                ))}
            </ul>
        </div>

    </div>
  )
}

export default LeaderboardScreen